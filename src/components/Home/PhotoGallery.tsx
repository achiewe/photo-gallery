import styled from "styled-components";
import { useGalleryStore } from "../../store";

export default function PhotoGallery(): JSX.Element {
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  return (
    <GalleryContainer>
      {/* {fetchPhotoes.map(photo) => {
        return   <div  className="imageContainer"></div>
      } } */}
    </GalleryContainer>
  );
}

const GalleryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .imageContainer {
    width: 100px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
