import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import crypto from "crypto";

import {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken
} from "../utils/token.utils";

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

export const generateSignupVerificationToken =
  (phone: string): string => {

    return crypto
      .randomBytes(32)
      .toString("hex");
  };

const generateOtp = (): string => {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
};

const accessTokenCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env['NODE_ENV'] === "production",
  path: "/",
  maxAge: 15 * 60 * 1000 // 15 minutes
};


const refreshTokenCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env['NODE_ENV'] === "production",
  path: "/api/v1/auth",
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export const phoneAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const { phone } = req.body;

    const { user } =
      await authService.phoneAuth(phone);

    // If a user exists, only customer can use this auth flow.
    if (user && user.role !== "customer") {

      res.status(403).json({
        success: false,
        message: "Only customers can login here"
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
      otp,
      // Tell frontend only that OTP was sent.
      // Don't return OTP in production.
      message: "OTP sent successfully"
    });

  } catch (err) {

         next(err);

  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const { phone, otp } = req.body;

    const record = otpStore.get(phone);

    // OTP doesn't exist
    if (!record) {

      res.status(400).json({
        success: false,
        message: "OTP not found or expired"
      });

      return;
    }

    // OTP expired
    if (record.expiresAt < Date.now()) {

      otpStore.delete(phone);

      res.status(400).json({
        success: false,
        message: "OTP expired"
      });

      return;
    }

    // Invalid OTP
    if (record.otp !== otp) {

      res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });

      return;
    }

    // OTP successfully verified
    otpStore.delete(phone);

    const { user } =
      await authService.phoneAuth(phone);

    // Existing user
    if (user) {

      if (user.role !== "customer") {

        res.status(403).json({
          success: false,
          message: "Only customers can login here"
        });

        return;
      }

      const accessToken =
        generateToken(user);

      const refreshToken =
        generateRefreshToken(user);

      res.cookie(
        "accessToken",
        accessToken,
        accessTokenCookieOptions
      );

      res.cookie(
        "refreshToken",
        refreshToken,
        refreshTokenCookieOptions
      );

      res.json({
        success: true,
        status: "LOGIN_SUCCESS",
        isNewUser: false,
        data: user
      });

      return;
    }

    // ------------------------------------------------
    // NEW USER
    // ------------------------------------------------

    const signupToken =
      generateSignupVerificationToken(phone);

    signupVerificationStore.set(
      signupToken,
      {
        phone,
        expiresAt: Date.now() + 10 * 60 * 1000
      }
    );

    res.json({
      success: true,
      status: "PROFILE_REQUIRED",
      isNewUser: true,
      signupToken
    });

  } catch (err) {

         next(err);

  }
};

export const completeSignup = async (
  req: Request,
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
        message: "Signup verification required"
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
        message: "Signup verification expired"
      });

      return;
    }

    if (
      verification.expiresAt < Date.now()
    ) {

      signupVerificationStore.delete(
        signupToken
      );

      res.status(401).json({
        success: false,
        message: "Signup verification expired"
      });

      return;
    }

    const phone =
      verification.phone;

    // Make sure user hasn't been created
    // between OTP verification and profile completion.
    const { user } =
      await authService.phoneAuth(phone);

    if (user) {

      signupVerificationStore.delete(
        signupToken
      );

      res.status(409).json({
        success: false,
        message: "User already exists"
      });

      return;
    }

    const newUser =
      await authService.completeSignup({
        phone,
        name,
        email,
        role: "customer"
      });

    // Token can no longer be reused.
    signupVerificationStore.delete(
      signupToken
    );

    const accessToken =
      generateToken(newUser);

    const refreshToken =
      generateRefreshToken(newUser);

    res.cookie(
      "accessToken",
      accessToken,
      accessTokenCookieOptions
    );

    res.cookie(
      "refreshToken",
      refreshToken,
      refreshTokenCookieOptions
    );

    res.status(201).json({
      success: true,
      status: "SIGNUP_SUCCESS",
      data: newUser
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
        message: "Refresh token not found"
      });

      return;
    }

    const decoded =
      verifyRefreshToken(token);


    // Find user
    const { user } =
      await authService.getUserById(
        decoded.userId
      );

    if (!user) {

      res.status(401).json({
        success: false,
        message: "User not found"
      });

      return;
    }

    if (!user.isActive) {

      res.status(401).json({
        success: false,
        message: "User account is inactive"
      });

      return;
    }

    const newAccessToken =
      generateToken(user);

    res.cookie(
      "accessToken",
      newAccessToken,
      accessTokenCookieOptions
    );


    res.json({
      success: true,
      message: "Access token refreshed"
    });

  } catch (err) {

    res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token"
    });

  }
};

export const logout = (
  req: Request,
  res: Response
): void => {

  res.clearCookie(
    "accessToken",
    {
      httpOnly: true,
      sameSite: "lax",
      secure:
        process.env['NODE_ENV'] === "production",
      path: "/"
    }
  );


  res.clearCookie(
    "refreshToken",
    {
      httpOnly: true,
      sameSite: "lax",
      secure:
        process.env['NODE_ENV'] === "production",
      path: "/api/v1/auth"
    }
  );


  res.json({
    success: true,
    message: "Logged out successfully"
  });
};