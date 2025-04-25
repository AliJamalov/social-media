import { create } from "zustand";
import io, { Socket } from "socket.io-client";
import { User } from "../types";

type socketStore = {
  socket: Socket | null;
  onlineUsers: User[];
  connectSocket: (authUser: User) => void;
  disconnectSocket: () => void;
};

export const useSocketStore = create<socketStore>((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: (authUser) => {
    if (!authUser || get().socket) return;

    const socket: Socket = io("http://localhost:5000", {
      query: {
        userId: authUser._id,
      },
    });

    socket.on("getOnlineUsers", (users: User[]) => {
      set({ onlineUsers: users });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));
