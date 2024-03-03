import { create } from "zustand";
import { SearchDataType } from "../type";

// Zustand Store Definition
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
  setInputValueArray: (data: { inputValue: string }) => void;
  setInputValue: (newValue: string) => void;
  setFetchPhotoes: (newPhotoes: SearchDataType[]) => void;
};

// Gallery Store Initialization
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
  setInputValueArray: ({ inputValue }) => {
    if (inputValue.trim() !== "") {
      set((state) => ({
        inputValueArray: [...state.inputValueArray, inputValue], // Add inputValue to the array
      }));
    }
  },
  setFetchPhotoes: (newPhotoes: SearchDataType[]) => {
    set({ fetchPhotoes: newPhotoes });
  },

  setInputValue: (newValue: string) => {
    set({ inputValue: newValue });
  },
}));
