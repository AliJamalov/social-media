import { create } from "zustand";
import io, { Socket } from "socket.io-client";
import { User } from "../types";

const isLocalhost = window.location.hostname === "localhost";

const URI = isLocalhost ? "http://localhost:5000" : "https://social-media-lf3m.onrender.com";

type socketStore = {
  socket: Socket | null;
  onlineUsers: string[];
  connectSocket: (authUser: User) => void;
  disconnectSocket: () => void;
};

export const useSocketStore = create<socketStore>((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: (authUser) => {
    if (!authUser || get().socket) return;

    const socket: Socket = io(URI, {
      query: {
        userId: authUser._id,
      },
    });

    socket.on("getOnlineUsers", (users: string[]) => {
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
