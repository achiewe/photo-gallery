import styled from "styled-components";
import { useGalleryStore } from "../../store";
import { SearchDataType } from "../../../type";

interface PhotoGalleryProps {
  queryPhotoes: SearchDataType[];
  photoesLoading: boolean;
}

export default function PhotoGallery({
  queryPhotoes,
  photoesLoading,
}: PhotoGalleryProps): JSX.Element {
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  const setFilteredImages = useGalleryStore((state) => state.setFilteredImages);

  // Declare searchData
  // const searchData = photoes.results || [];

  const handleImageClick = (identifier: string) => {
    if (queryPhotoes && queryPhotoes.length > 0) {
      const filteredSearchData = queryPhotoes.filter(
        (photo: SearchDataType) => photo.id === identifier
      );
      setFilteredImages(filteredSearchData);
    } else {
      const filteredFetchPhotoes = fetchPhotoes.filter(
        (photo: SearchDataType) => photo.id === identifier
      );
      setFilteredImages(filteredFetchPhotoes);
      // Handle the case when searchData is empty or not available sa
    }
  };

  if (photoesLoading) {
    return <div>Loading...</div>;
  }

  if (!queryPhotoes) {
    return (
      <GalleryContainer>
        {fetchPhotoes.map((photo: SearchDataType, index: number) => (
          <div key={index} className="imageContainer">
            <img
              src={photo.urls.thumb}
              srcSet={`${photo.urls.thumb} 375w, ${photo.urls.small} 768w`}
              sizes="(max-width: 768px) 375px, 768px"
              alt={photo.alt_description}
              onClick={() => handleImageClick(photo.id)}
            />
          </div>
        ))}
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      {queryPhotoes.map((photo: SearchDataType, index: number) => (
        <div key={index} className="imageContainer">
          <img
            src={photo.urls.thumb}
            srcSet={`${photo.urls.thumb} 375w, ${photo.urls.small} 768w`}
            sizes="(max-width: 768px) 375px, 768px"
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
