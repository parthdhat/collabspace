import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import * as invitationService from "./invitation.service";

export const getInvitation = asyncHandler(
  async (req: Request, res: Response) => {
    const invitation =
      await invitationService.getInvitation(req.params.token);

    res.json({
      success: true,
      data: invitation,
    });
  }
);

export const acceptInvitation = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await invitationService.acceptInvitation(
        req.params.token,
        req.user!.userId
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);