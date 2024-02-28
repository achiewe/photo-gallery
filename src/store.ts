import { create } from "zustand";
import { PhotoesType } from "../type";

type galleryStore = {
  fetchPhotoes: PhotoesType[];
  inputValue: string;
  inputValueArray: string[];
  setInputValueArray: (newArray: string[]) => void;
  setInputValue: (newValue: string) => void;
  setFetchPhotoes: (newphotoes: PhotoesType[]) => void;
};

export const useGalleryStore = create<galleryStore>((set) => ({
  fetchPhotoes: [],
  inputValue: "",
  inputValueArray: [],
  setInputValueArray: (newArray: string[]) => {
    set({ inputValueArray: newArray });
  },
  setFetchPhotoes: (newphotoes: PhotoesType[]) => {
    set({ fetchPhotoes: newphotoes });
  },
  setInputValue: (newValue: string) => {
    set({ inputValue: newValue });
  },
}));
