import styled from "styled-components";
import { useGalleryStore } from "../../store";
import { SearchDataType } from "../../../type";
import { useQueryClient } from "react-query";

interface PhotoGalleryProps {
  queryKeyData: string[];
  photoesLoading: boolean;
}

export default function PhotoGallery({
  queryKeyData,
  photoesLoading,
}: PhotoGalleryProps): JSX.Element {
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  const setFilteredImages = useGalleryStore((state) => state.setFilteredImages);

  const queryClient = useQueryClient();

  // Get cached data using the query key
  const cachedData = queryClient.getQueryData<SearchDataType[] | undefined>(
    queryKeyData
  );
  console.log(cachedData, "mevarcached");

  const handleImageClick = (identifier: string) => {
    if (cachedData && cachedData.length > 0) {
      const filteredSearchData = cachedData.filter(
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

  if (!cachedData) {
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
      {cachedData?.map((photo: SearchDataType, index: number) => (
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
