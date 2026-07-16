import { Router } from "express";
import channelRoutes from "../modules/channel/channel.routes";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import workspaceRoutes from "../modules/workspace/workspace.routes";
import invitationRoutes from "../modules/invitation/invitation.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/workspaces", workspaceRoutes);
router.use("/invitations", invitationRoutes);
router.use(
  "/workspaces/:workspaceId/channels",
  channelRoutes
);

export default router;