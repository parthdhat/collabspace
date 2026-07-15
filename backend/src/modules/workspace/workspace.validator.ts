import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(3).max(50),
});

export const updateMemberRoleSchema = z.object({
  role: z.enum(["OWNER", "ADMIN", "MEMBER"]),
});

export const createInvitationSchema = z.object({
  email: z.email(),
});