import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { generateToken } from "../utils/token.utils";

const otpStore = new Map<
  string,
  {
    otp: string;
    expiresAt: number;
  }
>();
const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const phoneAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { phone } = req.body;
    const { user } = await authService.phoneAuth(phone);

    const otp = generateOtp();

    otpStore.set(phone, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    if (user) {
      res.json({
        success: true,
        isNewUser: false,
        otp // remove later
      });
      return;
    }

    res.json({
      success: true,
      isNewUser: true,
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
        message: "OTP not found"
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

    const { user } = await authService.phoneAuth(phone);

    if (!user) {
      res.json({
        success: true,
        isNewUser: true
      });
      return;
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/"
    });

    res.json({
      success: true,
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
    const { user } = await authService.phoneAuth(req.body.phone);

    if (!user) {
      const newUser = await authService.completeSignup(req.body);

      const token = generateToken(newUser);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/"
      });

      res.json({ success: true, data: newUser });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    next(err);
  }
};

export const logout = (
  req: Request,
  res: Response
): void => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/"
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};