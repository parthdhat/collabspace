import prisma from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import { createChannelSchema } from "./channel.validator";

export const createChannel = async (
  workspaceId: string,
  userId: string,
  data: unknown
) => {
  const validated = createChannelSchema.parse(data);

  // Check membership
  const member = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId,
      userId,
    },
  });

  if (!member) {
    throw new ApiError(
      403,
      "You are not a member of this workspace"
    );
  }

  const slug = validated.name
    .toLowerCase()
    .replace(/\s+/g, "-");

  const existing = await prisma.channel.findFirst({
    where: {
      workspaceId,
      slug,
    },
  });

  if (existing) {
    throw new ApiError(
      409,
      "Channel already exists"
    );
  }

  return prisma.channel.create({
    data: {
      name: validated.name,
      slug,
      description: validated.description,
      workspaceId,
      createdById: userId,
    },
  });
};

export const getWorkspaceChannels = async (
  workspaceId: string,
  userId: string
) => {
  const member = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId,
      userId,
    },
  });

  if (!member) {
    throw new ApiError(
      403,
      "You are not a member of this workspace"
    );
  }

  return prisma.channel.findMany({
    where: {
      workspaceId,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const updateChannel = async (
  channelId: string,
  userId: string,
  data: unknown
) => {
  const validated = updateChannelSchema.parse(data);

  const channel = await prisma.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  const member = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId: channel.workspaceId,
      userId,
    },
  });

  if (!member) {
    throw new ApiError(403, "Access denied");
  }

  if (!["OWNER", "ADMIN"].includes(member.role)) {
    throw new ApiError(
      403,
      "Only OWNER or ADMIN can update channels"
    );
  }

  return prisma.channel.update({
    where: {
      id: channelId,
    },
    data: {
      ...validated,
      slug: validated.name
        ? validated.name.toLowerCase().replace(/\s+/g, "-")
        : undefined,
    },
  });
};

export const deleteChannel = async (
  channelId: string,
  userId: string
) => {
  const channel = await prisma.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  const member = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId: channel.workspaceId,
      userId,
    },
  });

  if (!member) {
    throw new ApiError(403, "Access denied");
  }

  if (!["OWNER", "ADMIN"].includes(member.role)) {
    throw new ApiError(
      403,
      "Only OWNER or ADMIN can delete channels"
    );
  }

  await prisma.channel.delete({
    where: {
      id: channelId,
    },
  });

  return {
    message: "Channel deleted successfully",
  };
};