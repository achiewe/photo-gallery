import { create } from "zustand";
import { PhotoesType } from "../type";

type galleryStore = {
  fetchPhotoes: PhotoesType[];
  inputValue: string;
  inputValueArray: string[];
  page: number;
  setPage: (newPage: number) => void;
  setInputValueArray: (newArray: string[]) => void;
  setInputValue: (newValue: string) => void;
  setFetchPhotoes: (newphotoes: PhotoesType[]) => void;
};

export const useGalleryStore = create<galleryStore>((set) => ({
  fetchPhotoes: [],
  inputValue: "",
  page: 1,
  inputValueArray: [],
  setPage: (newPage: number) => {
    set({ page: newPage });
  },
  setInputValueArray: (newArray) => {
    set((state) => ({
      inputValueArray: [...state.inputValueArray, ...newArray],
    }));
  },
  setFetchPhotoes: (newphotoes: PhotoesType[]) => {
    set({ fetchPhotoes: newphotoes });
  },
  setInputValue: (newValue: string) => {
    set({ inputValue: newValue });
  },
}));
