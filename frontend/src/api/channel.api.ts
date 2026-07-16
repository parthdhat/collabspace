import api from "./axios";

export const getChannels = async (workspaceId: string) => {
  const response = await api.get(
    `/workspaces/${workspaceId}/channels`
  );
  return response.data;
};

export const createChannel = async (
  workspaceId: string,
  name: string,
  description?: string
) => {
  const response = await api.post(
    `/workspaces/${workspaceId}/channels`,
    {
      name,
      description,
    }
  );

  return response.data;
};

export const updateChannel = async (
  workspaceId: string,
  channelId: string,
  data: {
    name?: string;
    description?: string;
  }
) => {
  const response = await api.patch(
    `/workspaces/${workspaceId}/channels/${channelId}`,
    data
  );

  return response.data;
};

export const deleteChannel = async (
  workspaceId: string,
  channelId: string
) => {
  const response = await api.delete(
    `/workspaces/${workspaceId}/channels/${channelId}`
  );

  return response.data;
};