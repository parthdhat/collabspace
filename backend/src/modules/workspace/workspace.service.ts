import prisma from "../../lib/prisma";
import { createWorkspaceSchema } from "./workspace.validator";

export const createWorkspace = async (
  userId: string,
  data: unknown
) => {
  const validated = createWorkspaceSchema.parse(data);

  const slug =
    validated.name.toLowerCase().replace(/\s+/g, "-") +
    "-" +
    Date.now();

  return prisma.workspace.create({
    data: {
      name: validated.name,
      slug,
      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
    },
    include: {
      members: true,
    },
  });
};

export const getUserWorkspaces = async (userId: string) => {
  return prisma.workspace.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};