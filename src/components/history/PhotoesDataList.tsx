import { useQueryClient } from "react-query";
import { SearchDataType } from "../../../type";
import styled from "styled-components";

interface PhotoesDataListProps {
  inputText: string;
}

export default function PhotoesDataList({ inputText }: PhotoesDataListProps) {
  const queryClient = useQueryClient();
  const queryData: any = queryClient.getQueryData(["photos", inputText]);

  return (
    <PhotoContainer>
      {queryData?.map((photo: SearchDataType, index: number) => (
        <div key={index} className="imageContainer">
          <img
            src={photo.urls.thumb}
            srcSet={`${photo.urls.thumb} 375w, ${photo.urls.small} 768w`}
            sizes="(max-width: 768px) 375px, 768px"
            alt={photo.alt_description}
          />
        </div>
      ))}
    </PhotoContainer>
  );
}

const PhotoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
