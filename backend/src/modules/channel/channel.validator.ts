import { z } from "zod";

export const createChannelSchema = z.object({
  name: z
    .string()
    .min(2, "Channel name is required")
    .max(50),
    
  description: z
    .string()
    .max(200)
    .optional(),
});

export const updateChannelSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(50)
    .optional(),

  description: z
    .string()
    .max(200)
    .optional(),
});