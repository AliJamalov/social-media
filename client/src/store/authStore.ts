import { create } from "zustand";
import toast from "react-hot-toast";
import { User } from "../types";
import { axiosInstance } from "../utils/axios";

type AuthStore = {
  user: User | null;
  checkAuthLoading: boolean;
  signupLoading: boolean;
  loginLoading: boolean;

  signup: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  checkAuthLoading: false,
  signupLoading: false,
  loginLoading: false,

  signup: async (username, password) => {
    set({ signupLoading: true });
    try {
      const response = await axiosInstance.post("/auth/signup", { username, password });
      set({ user: response.data.user });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ signupLoading: false });
    }
  },

  login: async (username, password) => {
    set({ loginLoading: true });
    try {
      const response = await axiosInstance.post("/auth/login", { username, password });
      set({ user: response.data.user });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ loginLoading: false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ user: null });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
    }
  },

  checkAuth: async () => {
    set({ checkAuthLoading: true });
    try {
      const response = await axiosInstance.get("/auth/me");
      set({ user: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ checkAuthLoading: false });
    }
  },
}));
