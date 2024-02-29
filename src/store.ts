import { create } from "zustand";
import { PhotoesType } from "../type";

type galleryStore = {
  fetchPhotoes: PhotoesType[];
  inputValue: string;
  inputValueArray: string[];
  page: number;
  perPage: number;
  loading: boolean;
  setPerPage: (newPage: number) => void;
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
  perPage: 20,
  loading: false,
  inputValueArray: [],
  setPerPage: (newPage: number) => {
    set({ perPage: newPage });
  },
  setLoading: (newLoading: boolean) => {
    set({ loading: newLoading });
  },
  setPage: (newPage: number) => {
    set((state) => ({ ...state, page: newPage }));
  },
  setInputValueArray: (newArray) => {
    if (newArray.length > 0) {
      set((state) => {
        // Filter out values that already exist in state.inputValueArray
        const uniqueValues = newArray.filter(
          (value) => !state.inputValueArray.includes(value)
        );
        return {
          inputValueArray: [...state.inputValueArray, ...uniqueValues],
        };
      });
    }
  },
  setFetchPhotoes: (newPhotoes: PhotoesType[]) => {
    set((state) => ({ fetchPhotoes: [...state.fetchPhotoes, ...newPhotoes] }));
    return;
  },

  setInputValue: (newValue: string) => {
    set({ inputValue: newValue });
  },
}));
