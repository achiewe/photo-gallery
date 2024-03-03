import styled from "styled-components";
import { useGalleryStore } from "../../store";
import { SearchDataType } from "../../../type";
import { InfiniteData } from "react-query";

interface PhotoGalleryProps {
  queryPhotoes: InfiniteData<SearchDataType[]> | undefined;
  photoesLoading: boolean;
}

export default function PhotoGallery({
  queryPhotoes,
  photoesLoading,
}: PhotoGalleryProps): JSX.Element {
  // Accessing state and setter functions from custom store
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  const setFilteredImages = useGalleryStore((state) => state.setFilteredImages);

  // Accessing query client from react-query

  console.log(queryPhotoes, "queryPhoto");

  // Function to handle image click
  const handleImageClick = (identifier: string) => {
    const data = queryPhotoes?.pages.flatMap((page) => page);
    if (data && data.length > 0) {
      const filteredSearchData = data.filter(
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
  // Conditional rendering based on loading state and available data
  if (photoesLoading) {
    return <div>Loading...</div>;
  }
  return (
    <GalleryContainer>
      {!queryPhotoes ? (
        <div>Loading...</div>
      ) : (
        <>
          {!queryPhotoes.pages || queryPhotoes.pages[0].length === 0
            ? fetchPhotoes.map((photo: SearchDataType, index: number) => (
                <div key={index}>
                  <img
                    src={photo.urls.thumb}
                    srcSet={`${photo.urls.thumb} 375w, ${photo.urls.small} 768w`}
                    sizes="(max-width: 768px) 375px, 768px"
                    alt={photo.alt_description}
                    onClick={() => handleImageClick(photo.id)}
                  />
                </div>
              ))
            : queryPhotoes.pages.flatMap((page) =>
                page.map((photo: SearchDataType) => (
                  <div key={photo.id}>
                    <img
                      src={photo.urls.thumb}
                      srcSet={`${photo.urls.thumb} 375w, ${photo.urls.small} 768w`}
                      sizes="(max-width: 768px) 375px, 768px"
                      alt={photo.alt_description}
                      onClick={() => handleImageClick(photo.id)}
                    />
                  </div>
                ))
              )}
        </>
      )}
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
