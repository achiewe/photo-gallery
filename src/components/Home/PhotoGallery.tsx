import styled from "styled-components";
import { useGalleryStore } from "../../store";

export default function PhotoGallery(): JSX.Element {
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  return (
    <GalleryContainer>
      {fetchPhotoes.map((photo) => {
        return (
          <div key={photo.id} className="imageContainer">
            <img src={photo.regularUrl} />
          </div>
        );
      })}
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
