import { create } from "zustand";
import { SearchDataType } from "../type";

type galleryStore = {
  fetchPhotoes: SearchDataType[];
  inputValue: string;
  inputValueArray: string[];
  page: number;
  perPage: number;
  filteredImages: SearchDataType[];
  setFilteredImages: (newFilterImage: SearchDataType[]) => void;
  loading: boolean;
  setPerPage: (newPage: number) => void;
  setLoading: (newLoading: boolean) => void;
  setPage: (newPage: number) => void;
  setInputValueArray: (newArray: string[]) => void;
  setInputValue: (newValue: string) => void;
  setFetchPhotoes: (newPhotoes: SearchDataType[]) => void;
};

export const useGalleryStore = create<galleryStore>((set) => ({
  fetchPhotoes: [],
  inputValue: "",
  filteredImages: [],
  page: 1,
  perPage: 20,
  loading: false,
  inputValueArray: [],

  setPerPage: (newPage: number) => {
    set({ perPage: newPage });
  },
  setFilteredImages: (newFilterImage: SearchDataType[]) => {
    set({ filteredImages: newFilterImage });
  },
  setLoading: (newLoading: boolean) => {
    set({ loading: newLoading });
  },
  setPage: (newPage: number) => {
    set({ page: newPage });
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
  setFetchPhotoes: (newPhotoes: SearchDataType[]) => {
    set({ fetchPhotoes: newPhotoes });
  },

  setInputValue: (newValue: string) => {
    set({ inputValue: newValue });
  },
}));
