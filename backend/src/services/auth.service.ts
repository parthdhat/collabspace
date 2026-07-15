import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { registerSchema } from "../validators/auth.validator";

export const register = async (data: unknown) => {
  const validated = registerSchema.parse(data);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: validated.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const passwordHash = await bcrypt.hash(validated.password, 10);

  const slug =
    validated.name.toLowerCase().replace(/\s+/g, "-") +
    "-" +
    Date.now();

  const user = await prisma.user.create({
    data: {
      name: validated.name,
      email: validated.email,
      passwordHash,

      memberships: {
        create: {
          role: "OWNER",
          workspace: {
            create: {
              name: `${validated.name}'s Workspace`,
              slug,
            },
          },
        },
      },
    },
    include: {
      memberships: {
        include: {
          workspace: true,
        },
      },
    },
  });

  return user;
};