import styled from "styled-components";
import { useGalleryStore } from "../../store";

export default function ModalWindow() {
  const filteredImages = useGalleryStore((state) => state.filteredImages);
  return (
    <ModalContainer>
      <div className="imageDataContainer">
        <img src={filteredImages[0]?.urls.thumb} />
      </div>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 300px;
  height: 100px;
  position: absolute;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  z-index: 1;

  .imageDataContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
