import { useEffect } from "react";
import { SearchDataType } from "../../../type";
import styled from "styled-components";
import { useQueryClient } from "react-query";

interface PhotoesDataListProps {
  inputText: string;
}

export default function PhotoesDataList({ inputText }: PhotoesDataListProps) {
  const queryClient = useQueryClient();

  // Function to load more items when user scrolls to the bottom
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      queryClient.prefetchInfiniteQuery(["photos", inputText]);
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Only attach the listener once on component mount

  // Getting query data based on input text
  const queryData: any = queryClient.getQueryData(["photos", inputText]);

  console.log(queryData, "mevar isss history query data");

  if (!Array.isArray(queryData?.pages)) {
    return null; // or display a loading message or handle the case appropriately
  }

  return (
    <PhotoContainer>
      {queryData?.pages.flatMap((page: any, pageIndex: number) =>
        page.map((photo: SearchDataType, index: number) => (
          <div key={`${pageIndex}-${index}`} className="imageContainer">
            {photo.urls?.thumb && ( // Check if photo.urls.thumb exists
              <img
                src={photo.urls?.thumb}
                srcSet={`${photo.urls?.thumb} 375w, ${photo.urls?.small} 768w`}
                sizes="(max-width: 768px) 375px, 768px"
                alt={photo?.alt_description}
              />
            )}
          </div>
        ))
      )}
    </PhotoContainer>
  );
}

// Styled container for PhotoesDataList component
const PhotoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
