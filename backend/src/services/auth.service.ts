import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { registerSchema } from "../validators/auth.validator";
import { ApiError } from "../utils/ApiError";
import { loginSchema } from "../validators/auth.validator";
import { generateAccessToken } from "../utils/jwt";

export const register = async (data: unknown) => {
  const validated = registerSchema.parse(data);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: validated.email,
    },
  });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
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

export const login = async (data: unknown) => {
  const validated = loginSchema.parse(data);

  const user = await prisma.user.findUnique({
    where: {
      email: validated.email,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(
    validated.password,
    user.passwordHash
  );

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
  };
};