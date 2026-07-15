import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import * as workspaceService from "./workspace.service";

export const createWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const workspace = await workspaceService.createWorkspace(
      req.user!.userId,
      req.body
    );

    res.status(201).json({
      success: true,
      data: workspace,
    });
  }
);