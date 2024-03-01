import styled from "styled-components";
import { useGalleryStore } from "../../store";
import { PhotoesType } from "../../../type";
import { useQuery } from "react-query";
import axios from "axios";
import ModalWindow from "./ModalWindow";

const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

export default function PhotoGallery(): JSX.Element {
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  const inputValue = useGalleryStore((state) => state.inputValue);
  const page = useGalleryStore((state) => state.page);
  const perPage = useGalleryStore((state) => state.perPage);

  const queryKey = ["photos", inputValue]; // Include inputValue in queryKey
  const { data: photoes, isLoading: photoesLoading } = useQuery(
    queryKey,

    async () => {
      try {
        console.log(queryKey, "asdasd");
        if (inputValue !== "") {
          const response = await axios.get(
            `https://api.unsplash.com/search/photos/?client_id=${accessKey}&page=${page}&per_page=${perPage}&query=${inputValue}`,
            {
              headers: { Authorization: `${accessKey}` },
            }
          );
          return response.data;
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
      }
      console.log(photoes, "asdasd");
    }
  );

  if (photoesLoading) {
    return <div>Loading...</div>; // Render a loading indicator while fetching data
  }

  if (!photoes) {
    return (
      <GalleryContainer>
        {fetchPhotoes.map((photo: PhotoesType, index: number) => (
          <div key={index} className="imageContainer">
            <img src={photo.regularUrl} alt={photo.description} />
          </div>
        ))}
      </GalleryContainer>
    );
  }

  const searchData = photoes.results;

  return (
    <GalleryContainer>
      {searchData.map((photo: any, index: number) => (
        <div key={index} className="imageContainer">
          <img src={photo.urls.thumb} alt={photo.description} />
        </div>
      ))}
      <ModalWindow />
    </GalleryContainer>
  );
}

const GalleryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 20px;

  img {
    cursor: pointer;
  }
`;