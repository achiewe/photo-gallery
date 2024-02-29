import styled from "styled-components";
import PhotoGallery from "../components/Home/PhotoGallery";
import InputField from "../components/Home/InputField";
import { useEffect } from "react";
import axios from "axios";
import { PhotoesType } from "../../type";
import { useGalleryStore } from "../store";
const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

export default function Home(): JSX.Element {
  const setFetchPhotoes = useGalleryStore((state) => state.setFetchPhotoes);
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/?client_id=${accessKey}&order_by=popular&per_page=20`
        );

        const processedData: PhotoesType[] = response.data.map(
          (photo: any) => ({
            downloads: photo.downloads,
            views: photo.views,
            likes: photo.likes,
            id: photo.id,
            regularUrl: photo.urls.thumb,
            altDescription: photo.alt_description,
            description: photo.description,
          })
        );

        setFetchPhotoes(processedData);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    getImages();
  }, []);
  return (
    <HomeContainer>
      <InputField />
      <PhotoGallery />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
