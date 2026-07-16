import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";

import {
  createChannel,
  getWorkspaceChannels,
  updateChannel,
  deleteChannel,
} from "./channel.controller";

const router = Router({ mergeParams: true });

router.get("/", authenticate, getWorkspaceChannels);

router.post("/", authenticate, createChannel);

router.patch("/:channelId", authenticate, updateChannel);

router.delete("/:channelId", authenticate, deleteChannel);

export default router;