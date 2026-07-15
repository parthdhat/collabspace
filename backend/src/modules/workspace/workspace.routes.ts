import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
  getWorkspaceMembers,
  updateMemberRole,
  createInvitation
} from "./workspace.controller";

const router = Router();

router.post("/", authenticate, createWorkspace);

router.get("/", authenticate, getUserWorkspaces);

router.get("/:workspaceId", authenticate, getWorkspaceById);
router.get(
  "/:workspaceId/members",
  authenticate,
  getWorkspaceMembers
);
router.patch(
  "/:workspaceId/members/:memberId",
  authenticate,
  updateMemberRole
);
router.post(
  "/:workspaceId/invitations",
  authenticate,
  createInvitation
);

export default router;