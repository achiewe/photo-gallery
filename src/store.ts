import { create } from "zustand";
import { SearchDataType } from "../type";

type galleryStore = {
  fetchPhotoes: SearchDataType[];
  inputValue: string;
  inputValueArray: { [key: string]: SearchDataType[] };
  page: number;
  perPage: number;
  filteredImages: SearchDataType[];
  setFilteredImages: (newFilterImage: SearchDataType[]) => void;
  loading: boolean;
  setPerPage: (newPage: number) => void;
  setLoading: (newLoading: boolean) => void;
  setPage: (newPage: number) => void;
  setInputValueArray: (data: {
    inputValue: string;
    queryPhotoes: SearchDataType[];
  }) => void;
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
  inputValueArray: {},

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
  setInputValueArray: ({ inputValue, queryPhotoes }) => {
    if (inputValue.trim() !== "") {
      set((state) => ({
        inputValueArray: {
          ...state.inputValueArray,
          [inputValue]: queryPhotoes,
        },
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
