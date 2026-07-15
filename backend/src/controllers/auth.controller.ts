import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});