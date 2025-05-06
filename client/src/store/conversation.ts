import { create } from "zustand";
import { Convesation } from "../types";
import { axiosInstance } from "../utils/axios";
import { User } from "../types";

type ConvesationStore = {
  getChats: () => void;
  getRecommendedUsers: () => void;
  recomendedUsers: User[];
  conversations: Convesation[] | null;
  chatsLoading: boolean;
  recommendedUsersLoading: boolean;
};

const useConversationStore = create<ConvesationStore>((set) => ({
  selectedConversation: null,
  conversations: null,
  recomendedUsers: [],
  chatsLoading: true,
  recommendedUsersLoading: true,

  getChats: async () => {
    try {
      const response = await axiosInstance.get("/chats/my-chats");
      set({ conversations: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ chatsLoading: false });
    }
  },

  getRecommendedUsers: async () => {
    try {
      const response = await axiosInstance.get("/users/recommended");
      set({ recomendedUsers: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ recommendedUsersLoading: false });
    }
  },
}));

export default useConversationStore;
