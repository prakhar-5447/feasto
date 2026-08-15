import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

import {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken
} from "../utils/token.utils";

const otpStore = new Map<
  string,
  {
    otp: string;
    expiresAt: number;
  }
>();

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

    const { user } = await authService.phoneAuth(phone);

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
      isNewUser: !user,
      otp
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

    if (!record) {

      res.status(400).json({
        success: false,
        message: "OTP not found or expired"
      });

      return;
    }

    if (record.expiresAt < Date.now()) {

      otpStore.delete(phone);

      res.status(400).json({
        success: false,
        message: "OTP expired"
      });

      return;
    }

    if (record.otp !== otp) {

      res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });

      return;
    }

    otpStore.delete(phone);

    const { user } =
      await authService.phoneAuth(phone);

    if (!user) {

      res.json({
        success: true,
        isNewUser: true
      });

      return;
    }

    if (user.role !== "customer") {
      res.status(403).json({
        success: false,
        message: "Only Customer can login here"
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
      isNewUser: false,
      data: user
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

    const { phone } = req.body;
    const { user } =
      await authService.phoneAuth(phone);

    if (user) {

      res.status(400).json({
        success: false,
        message: "User already exists"
      });

      return;
    }

    req.body.role = "customer"
    const newUser =
      await authService.completeSignup(
        req.body
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