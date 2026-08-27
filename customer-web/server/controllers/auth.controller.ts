import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

import * as authService from '../services/auth.service';

import {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken
} from '../utils/token.utils';

interface PhoneAuthRequest extends Request {
  body: {
    phone: string;
  };
}

interface VerifyOtpRequest extends Request {
  body: {
    phone: string;
    otp: string;
  };
}

interface CompleteSignupRequest extends Request {
  body: {
    signupToken: string;
    name: string;
    email?: string;
  };
}

interface OtpRecord {
  otp: string;
  expiresAt: number;
}

interface SignupVerificationRecord {
  phone: string;
  expiresAt: number;
}

export const otpStore =
  new Map<string, OtpRecord>();

export const signupVerificationStore =
  new Map<string, SignupVerificationRecord>();

const generateOtp = (): string =>
  Math.floor(
    100000 + Math.random() * 900000
  ).toString();

export const generateSignupVerificationToken =
  (): string =>
    crypto.randomBytes(32).toString('hex');

const accessTokenCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env['NODE_ENV'] === 'production',
  path: '/',
  maxAge: 15 * 60 * 1000
};

const refreshTokenCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env['NODE_ENV'] === 'production',
  path: '/api/v1/auth',
  maxAge: 7 * 24 * 60 * 60 * 1000
};

export const phoneAuth = async (
  req: PhoneAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { phone } = req.body;

    const { user } =
      await authService.phoneAuth(phone);

    if (user && user.role !== 'CUSTOMER') {
      res.status(403).json({
        success: false,
        message: 'Only customers can login here',
        data: null
      });
      return;
    }

    const otp = generateOtp();

    otpStore.set(phone, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    res.json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        phone,
        otp
      }
    });
  } catch (err) {
    next(err);
  }
};

export const verifyOtp = async (
  req: VerifyOtpRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { phone, otp } = req.body;

    const record = otpStore.get(phone);

    if (!record) {
      res.status(400).json({
        success: false,
        message: 'OTP not found or expired',
        data: null
      });
      return;
    }

    if (record.expiresAt < Date.now()) {
      otpStore.delete(phone);

      res.status(400).json({
        success: false,
        message: 'OTP expired',
        data: null
      });
      return;
    }

    if (record.otp !== otp) {
      res.status(400).json({
        success: false,
        message: 'Invalid OTP',
        data: null
      });
      return;
    }

    otpStore.delete(phone);

    const { user } =
      await authService.phoneAuth(phone);

    if (user) {
      if (user.role !== 'CUSTOMER') {
        res.status(403).json({
          success: false,
          message: 'Only customers can login here',
          data: null
        });
        return;
      }

      const accessToken =
        generateToken(user);

      const refreshToken =
        generateRefreshToken(user);

      res.cookie(
        'accessToken',
        accessToken,
        accessTokenCookieOptions
      );

      res.cookie(
        'refreshToken',
        refreshToken,
        refreshTokenCookieOptions
      );

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          status: 'LOGIN_SUCCESS',
          isNewUser: false,
          user
        }
      });

      return;
    }

    const signupToken =
      generateSignupVerificationToken();

    signupVerificationStore.set(
      signupToken,
      {
        phone,
        expiresAt: Date.now() + 10 * 60 * 1000
      }
    );

    res.json({
      success: true,
      message: 'Profile information required',
      data: {
        status: 'PROFILE_REQUIRED',
        isNewUser: true,
        signupToken
      }
    });
  } catch (err) {
    next(err);
  }
};

export const completeSignup = async (
  req: CompleteSignupRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      signupToken,
      name,
      email
    } = req.body;

    if (!signupToken) {
      res.status(401).json({
        success: false,
        message: 'Signup verification required',
        data: null
      });
      return;
    }

    const verification =
      signupVerificationStore.get(
        signupToken
      );

    if (!verification) {
      res.status(401).json({
        success: false,
        message: 'Signup verification expired',
        data: null
      });
      return;
    }

    if (verification.expiresAt < Date.now()) {
      signupVerificationStore.delete(
        signupToken
      );

      res.status(401).json({
        success: false,
        message: 'Signup verification expired',
        data: null
      });
      return;
    }

    const phone =
      verification.phone;

    const { user } =
      await authService.phoneAuth(phone);

    if (user) {
      signupVerificationStore.delete(
        signupToken
      );

      res.status(409).json({
        success: false,
        message: 'User already exists',
        data: null
      });
      return;
    }

    const newUser =
      await authService.completeSignup({
        phone,
        name,
        email,
        role: 'CUSTOMER'
      });

    signupVerificationStore.delete(
      signupToken
    );

    const accessToken =
      generateToken(newUser);

    const refreshToken =
      generateRefreshToken(newUser);

    res.cookie(
      'accessToken',
      accessToken,
      accessTokenCookieOptions
    );

    res.cookie(
      'refreshToken',
      refreshToken,
      refreshTokenCookieOptions
    );

    res.status(201).json({
      success: true,
      message: 'Signup successful',
      data: {
        status: 'SIGNUP_SUCCESS',
        user: newUser
      }
    });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.cookies['refreshToken'];

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Refresh token not found',
        data: null
      });
      return;
    }

    const decoded =
      verifyRefreshToken(token);

    const { user } =
      await authService.getUserById(
        decoded.userId
      );

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
        data: null
      });
      return;
    }

    if (!user.isActive) {
      res.status(401).json({
        success: false,
        message: 'User account is inactive',
        data: null
      });
      return;
    }

    const newAccessToken =
      generateToken(user);

    res.cookie(
      'accessToken',
      newAccessToken,
      accessTokenCookieOptions
    );

    res.json({
      success: true,
      message: 'Access token refreshed',
      data: null
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token',
      data: null
    });
  }
};

export const logout = (
  req: Request,
  res: Response
): void => {
  res.clearCookie('accessToken', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env['NODE_ENV'] === 'production',
    path: '/'
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env['NODE_ENV'] === 'production',
    path: '/api/v1/auth'
  });

  res.json({
    success: true,
    message: 'Logged out successfully',
    data: null
  });
};