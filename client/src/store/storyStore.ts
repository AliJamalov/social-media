import { create } from "zustand";
import { Story } from "../types";
import { axiosInstance } from "../utils/axios";

type StoryStore = {
  stories: Story[] | null;
  image: File | null;
  prevImage: string | null;
  setMedia: (image: File) => void;
  setPrevUrl: (prevImage: string) => void;
  addStory: (text: string, prevImage: string) => Promise<boolean>;
  addLoading: boolean;
};

export const useStoryStore = create<StoryStore>((set) => ({
  stories: [],
  image: null,
  prevImage: "",
  addLoading: false,

  addStory: async (text: string, mediaUrl: string) => {
    set({ addLoading: true });
    try {
      await axiosInstance.post("/stories", { text, mediaUrl });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      set({ addLoading: false });
    }
  },

  setMedia: (image: File) => set({ image }),
  setPrevUrl: (prevImage: string) => set({ prevImage }),
}));
