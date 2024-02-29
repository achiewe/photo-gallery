import styled from "styled-components";
import { useGalleryStore } from "../../store";
import { PhotoesType } from "../../../type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

// const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

export default function PhotoGallery(): JSX.Element {
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  const inputValue = useGalleryStore((state) => state.inputValue);

  const filteredPhotos = fetchPhotoes.filter((photo: PhotoesType) => {
    return photo.altDescription
      ?.toLowerCase()
      .includes(inputValue.toLowerCase());
  });

  return (
    <GalleryContainer>
      {filteredPhotos.map((photo, index) => (
        <div key={index} className="imageContainer">
          <img src={photo.regularUrl} alt={photo.description} />
        </div>
      ))}
    </GalleryContainer>
  );
}

const GalleryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
