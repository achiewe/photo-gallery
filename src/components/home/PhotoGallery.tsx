import styled from "styled-components";
import { useGalleryStore } from "../../store";
import { PhotoesType, SearchDataType } from "../../../type";
import { useQuery } from "react-query";
import axios from "axios";
import ModalWindow from "./ModalWindow";

const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

export default function PhotoGallery(): JSX.Element {
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  const inputValue = useGalleryStore((state) => state.inputValue);
  const page = useGalleryStore((state) => state.page);
  const perPage = useGalleryStore((state) => state.perPage);
  const setFilteredImages = useGalleryStore((state) => state.setFilteredImages);

  const queryKey = ["photos", inputValue]; // Include inputValue in queryKey
  const { data: photoes, isLoading: photoesLoading } = useQuery(
    queryKey,

    async () => {
      try {
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
    }
  );

  // Declare searchData
  const searchData = photoes?.results || [];

  const handleImageClick = (identifier: string) => {
    if (searchData && searchData.length > 0) {
      const filteredSearchData = searchData.filter(
        (photo: SearchDataType) => photo.id === identifier
      );
      setFilteredImages(filteredSearchData);
    } else {
      const filteredFetchPhotoes = fetchPhotoes.filter(
        (photo: PhotoesType) => photo.id === identifier
      );
      setFilteredImages(filteredFetchPhotoes);
      // Handle the case when searchData is empty or not available
    }
  };

  if (photoesLoading) {
    return <div>Loading...</div>;
  }

  if (!photoes) {
    return (
      <GalleryContainer>
        {fetchPhotoes.map((photo: PhotoesType, index: number) => (
          <div key={index} className="imageContainer">
            <img
              src={photo.regularUrl}
              alt={photo.description}
              onClick={() => handleImageClick(photo.id)}
            />
          </div>
        ))}
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      {searchData.map((photo: SearchDataType, index: number) => (
        <div key={index} className="imageContainer">
          <img
            src={photo.urls.thumb}
            alt={photo.alt_description}
            onClick={() => handleImageClick(photo.id)}
          />
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
  position: relative;
  gap: 20px;

  img {
    cursor: pointer;
  }
`;
