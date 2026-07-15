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

export const getUserWorkspaces = asyncHandler(
  async (req: Request, res: Response) => {
    const workspaces = await workspaceService.getUserWorkspaces(
      req.user!.userId
    );

    res.status(200).json({
      success: true,
      data: workspaces,
    });
  }
);

export const getWorkspaceById = asyncHandler(
  async (req: Request, res: Response) => {
    const workspace = await workspaceService.getWorkspaceById(
      req.params.workspaceId,
      req.user!.userId
    );

    res.status(200).json({
      success: true,
      data: workspace,
    });
  }
);

export const getWorkspaceMembers = asyncHandler(
  async (req: Request, res: Response) => {
    const members =
      await workspaceService.getWorkspaceMembers(
        req.params.workspaceId,
        req.user!.userId
      );

    res.status(200).json({
      success: true,
      data: members,
    });
  }
);

export const updateMemberRole = asyncHandler(
  async (req: Request, res: Response) => {
    const member = await workspaceService.updateMemberRole(
      req.params.workspaceId,
      req.params.memberId,
      req.user!.userId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Member role updated successfully",
      data: member,
    });
  }
);

export const createInvitation = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await workspaceService.createInvitation(
        req.params.workspaceId,
        req.user!.userId,
        req.body
      );

    res.status(201).json({
      success: true,
      message: "Invitation created successfully",
      data: result,
    });
  }
);