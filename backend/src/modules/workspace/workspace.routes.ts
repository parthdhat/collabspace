import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  createWorkspace,
  getUserWorkspaces,
} from "./workspace.controller";

const router = Router();

router.post("/", authenticate, createWorkspace);

router.get("/", authenticate, getUserWorkspaces);

export default router;