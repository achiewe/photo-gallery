import { create } from "zustand";

type galleryStore = {
  fetchPhotoes: [];
  setFetchPhotoes: (newphotoes: []) => void;
};

export const useGalleryStore = create<galleryStore>((set) => ({
  fetchPhotoes: [],
  setFetchPhotoes: (newphotoes: []) => {
    set({ fetchPhotoes: newphotoes });
  },
}));
