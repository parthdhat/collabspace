import { Router } from "express";
import { getInvitation,acceptInvitation } from "./invitation.controller";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/:token", getInvitation);
router.post(
  "/:token/accept",
  authenticate,
  acceptInvitation
);

export default router;