import { create } from "zustand";
import { PhotoesType } from "../type";

type galleryStore = {
  fetchPhotoes: PhotoesType[];
  inputValue: string;
  setInputValue: (newValue: string) => void;
  setFetchPhotoes: (newphotoes: PhotoesType[]) => void;
};

export const useGalleryStore = create<galleryStore>((set) => ({
  fetchPhotoes: [],
  inputValue: "",
  setFetchPhotoes: (newphotoes: PhotoesType[]) => {
    set({ fetchPhotoes: newphotoes });
  },
  setInputValue: (newValue: string) => {
    set({ inputValue: newValue });
  },
}));
