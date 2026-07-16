import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import * as channelService from "./channel.service";

export const createChannel = asyncHandler(
  async (req: Request, res: Response) => {
    const channel =
      await channelService.createChannel(
        req.params.workspaceId,
        req.user!.userId,
        req.body
      );

    res.status(201).json({
      success: true,
      data: channel,
    });
  }
);

export const getWorkspaceChannels = asyncHandler(
  async (req: Request, res: Response) => {
    const channels =
      await channelService.getWorkspaceChannels(
        req.params.workspaceId,
        req.user!.userId
      );

    res.status(200).json({
      success: true,
      data: channels,
    });
  }
);

export const updateChannel = asyncHandler(
  async (req: Request, res: Response) => {
    const channel =
      await channelService.updateChannel(
        req.params.channelId,
        req.user!.userId,
        req.body
      );

    res.status(200).json({
      success: true,
      data: channel,
    });
  }
);

export const deleteChannel = asyncHandler(
  async (req: Request, res: Response) => {
    const result =
      await channelService.deleteChannel(
        req.params.channelId,
        req.user!.userId
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  }
);