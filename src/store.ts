import { create } from "zustand";
import { PhotoesType } from "../type";

type galleryStore = {
  fetchPhotoes: PhotoesType[];
  inputValue: string;
  inputValueArray: string[];
  page: number;
  loading: boolean;
  setLoading: (newLoading: boolean) => void;
  setPage: (newPage: number) => void;
  setInputValueArray: (newArray: string[]) => void;
  setInputValue: (newValue: string) => void;
  setFetchPhotoes: (newPhotoes: PhotoesType[]) => void;
};

export const useGalleryStore = create<galleryStore>((set) => ({
  fetchPhotoes: [],
  inputValue: "",
  page: 1,
  loading: false,
  inputValueArray: [],
  setLoading: (newLoading: boolean) => {
    set({ loading: newLoading });
  },
  setPage: (newPage: number) => {
    set((state) => ({ ...state, page: newPage }));
  },
  setInputValueArray: (newArray) => {
    set((state) => ({
      inputValueArray: [...state.inputValueArray, ...newArray],
    }));
  },
  setFetchPhotoes: (newPhotoes: PhotoesType[]) => {
    set((state) => ({ fetchPhotoes: [...state.fetchPhotoes, ...newPhotoes] }));
    return;
  },

  setInputValue: (newValue: string) => {
    set({ inputValue: newValue });
  },
}));
