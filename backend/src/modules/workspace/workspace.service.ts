import prisma from "../../lib/prisma";
import {
  createWorkspaceSchema,
  updateMemberRoleSchema,
  createInvitationSchema
} from "./workspace.validator";
import { v4 as uuid } from "uuid";
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

export const getWorkspaceById = async (
  workspaceId: string,
  userId: string
) => {
  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
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
  });

  if (!workspace) {
    throw new ApiError(
      404,
      "Workspace not found or you don't have access"
    );
  }

  return workspace;
};

export const getWorkspaceMembers = async (
  workspaceId: string,
  userId: string
) => {
  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
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
              avatarUrl: true,
            },
          },
        },
        orderBy: {
          joinedAt: "asc",
        },
      },
    },
  });

  if (!workspace) {
    throw new ApiError(
      404,
      "Workspace not found or you don't have access"
    );
  }

  return workspace.members;
};

export const updateMemberRole = async (
  workspaceId: string,
  memberId: string,
  currentUserId: string,
  data: unknown
) => {
  const validated = updateMemberRoleSchema.parse(data);

  // Check current user's role
  const currentMember = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId,
      userId: currentUserId,
    },
  });

  if (!currentMember) {
    throw new ApiError(403, "You are not a member of this workspace");
  }

  if (currentMember.role !== "OWNER") {
    throw new ApiError(403, "Only workspace owner can change roles");
  }

  const member = await prisma.workspaceMember.findUnique({
    where: {
      id: memberId,
    },
  });

  if (!member || member.workspaceId !== workspaceId) {
    throw new ApiError(404, "Member not found");
  }

  return prisma.workspaceMember.update({
    where: {
      id: memberId,
    },
    data: {
      role: validated.role,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const createInvitation = async (
  workspaceId: string,
  currentUserId: string,
  data: unknown
) => {
  const validated = createInvitationSchema.parse(data);

  const currentMember = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId,
      userId: currentUserId,
    },
  });

  if (!currentMember) {
    throw new ApiError(403, "You are not a member of this workspace");
  }

  if (
    currentMember.role !== "OWNER" &&
    currentMember.role !== "ADMIN"
  ) {
    throw new ApiError(403, "You don't have permission to invite members");
  }

  const existingInvitation =
    await prisma.workspaceInvitation.findFirst({
      where: {
        workspaceId,
        email: validated.email,
        acceptedAt: null,
      },
    });

  if (existingInvitation) {
    throw new ApiError(
      409,
      "An active invitation already exists for this email"
    );
  }

  const token = uuid();

  const invitation =
    await prisma.workspaceInvitation.create({
      data: {
        email: validated.email,
        token,
        workspaceId,
        invitedById: currentUserId,
        expiresAt: new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
        ),
      },
    });

  return {
    invitation,
    invitationUrl: `http://localhost:5173/invitations/${token}`,
  };
};