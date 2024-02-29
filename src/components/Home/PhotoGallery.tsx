import styled from "styled-components";
import { useGalleryStore } from "../../store";
import { PhotoesType } from "../../../type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

export default function PhotoGallery(): JSX.Element {
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  const inputValue = useGalleryStore((state) => state.inputValue);

  // const { data: photoes, isLoading } = useQuery("images", async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.unsplash.com/photos/?client_id=${accessKey}&order_by=popular&per_page=20`
  //     );
  //     return response.data.map((photo: any) => ({
  //       downloads: photo.downloads,
  //       views: photo.views,
  //       likes: photo.likes,
  //       id: photo.id,
  //       regularUrl: photo.urls.thumb,
  //       altDescription: photo.alt_description,
  //     })) as PhotoesType[];
  //   } catch (error) {
  //     console.error("Error fetching images:", error);
  //     throw error;
  //   }
  // });

  // if (isLoading) {
  //   return <h2>Loading...</h2>;
  // }

  // if (!photoes) {
  //   return <div>No data available</div>;
  // }

  const filteredPhotos = fetchPhotoes.filter((photo: PhotoesType) => {
    return photo.altDescription
      ?.toLowerCase()
      .includes(inputValue.toLowerCase());
  });

  return (
    <GalleryContainer>
      {filteredPhotos.map((photo) => (
        <div key={photo.id} className="imageContainer">
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
