import { create } from "zustand";

interface AuthState {
  token: string | null;

  selectedWorkspaceId: string | null;
  selectedChannelId: string | null;

  setToken: (token: string) => void;

  setSelectedWorkspace: (id: string) => void;
  setSelectedChannel: (id: string) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),

  selectedWorkspaceId: null,
  selectedChannelId: null,

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },

  setSelectedWorkspace: (id) => {
    set({
      selectedWorkspaceId: id,
      selectedChannelId: null, // Reset selected channel when workspace changes
    });
  },

  setSelectedChannel: (id) => {
    set({
      selectedChannelId: id,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      token: null,
      selectedWorkspaceId: null,
      selectedChannelId: null,
    });
  },
}));