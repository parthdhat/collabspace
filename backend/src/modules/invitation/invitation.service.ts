import prisma from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";

export const getInvitation = async (token: string) => {
  const invitation = await prisma.workspaceInvitation.findUnique({
    where: {
      token,
    },
    include: {
      workspace: {
        select: {
          id: true,
          name: true,
        },
      },
      invitedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!invitation) {
    throw new ApiError(404, "Invitation not found");
  }

  if (invitation.acceptedAt) {
    throw new ApiError(400, "Invitation already accepted");
  }

  if (invitation.expiresAt < new Date()) {
    throw new ApiError(400, "Invitation has expired");
  }

  return invitation;
};

export const acceptInvitation = async (
  token: string,
  currentUserId: string
) => {
  const invitation = await prisma.workspaceInvitation.findUnique({
    where: {
      token,
    },
  });

  if (!invitation) {
    throw new ApiError(404, "Invitation not found");
  }

  if (invitation.acceptedAt) {
    throw new ApiError(400, "Invitation already accepted");
  }

  if (invitation.expiresAt < new Date()) {
    throw new ApiError(400, "Invitation expired");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      id: currentUserId,
    },
  });

  if (!currentUser) {
    throw new ApiError(404, "User not found");
  }

  if (currentUser.email !== invitation.email) {
    throw new ApiError(
      403,
      "This invitation belongs to another email address"
    );
  }

  return prisma.$transaction(async (tx) => {
    await tx.workspaceMember.create({
      data: {
        workspaceId: invitation.workspaceId,
        userId: currentUser.id,
        role: "MEMBER",
      },
    });

    await tx.workspaceInvitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        acceptedAt: new Date(),
      },
    });

    return {
      message: "Invitation accepted successfully",
    };
  });
};