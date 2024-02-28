import { create } from "zustand";
import { PhotoesType } from "../type";

type galleryStore = {
  fetchPhotoes: PhotoesType[];
  setFetchPhotoes: (newphotoes: PhotoesType[]) => void;
};

export const useGalleryStore = create<galleryStore>((set) => ({
  fetchPhotoes: [],
  setFetchPhotoes: (newphotoes: PhotoesType[]) => {
    set({ fetchPhotoes: newphotoes });
  },
}));
