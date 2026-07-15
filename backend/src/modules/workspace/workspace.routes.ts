import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { createWorkspace } from "./workspace.controller";

const router = Router();

router.post("/", authenticate, createWorkspace);

export default router;