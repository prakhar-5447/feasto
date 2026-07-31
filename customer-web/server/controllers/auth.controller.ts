import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { generateToken } from "../utils/token.utils";

export const phoneAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { phone } = req.body;

    const { user, isNewUser } = await authService.phoneAuth(phone);

    if (user) {
      const token = generateToken(user);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
      });

      res.json({ success: true, isNewUser: false, data: user });
      return;
    }

    res.json({ success: true, isNewUser: true });
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
    path: "/",
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
};