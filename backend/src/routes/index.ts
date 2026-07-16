import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import workspaceRoutes from "../modules/workspace/workspace.routes";
import invitationRoutes from "../modules/invitation/invitation.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/workspaces", workspaceRoutes);
router.use("/invitations", invitationRoutes);

export default router;