import { create } from "zustand";
import { Story } from "../types";
import { axiosInstance } from "../utils/axios";

type StoryStore = {
  stories: Story[] | null;
  myStory: Story | null;
  image: File | null;
  prevImage: string | null;
  setMedia: (image: File) => void;
  setPrevUrl: (prevImage: string) => void;
  addStory: (text: string, prevImage: string) => Promise<boolean>;
  fetchStories: () => void;
  fetchMyStory: () => void;
  addLoading: boolean;
  fetchLoading: boolean;
};

export const useStoryStore = create<StoryStore>((set) => ({
  stories: [],
  myStory: null,
  image: null,
  prevImage: "",
  addLoading: false,
  fetchLoading: false,

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

  fetchStories: async () => {
    set({ fetchLoading: true });
    try {
      const response = await axiosInstance.get("/stories");
      set({ stories: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ fetchLoading: false });
    }
  },

  fetchMyStory: async () => {
    set({ fetchLoading: true });
    try {
      const response = await axiosInstance.get("/stories/my-story");
      set({ myStory: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ fetchLoading: false });
    }
  },

  setMedia: (image: File) => set({ image }),
  setPrevUrl: (prevImage: string) => set({ prevImage }),
}));
