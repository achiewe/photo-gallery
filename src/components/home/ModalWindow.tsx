import styled from "styled-components";
import { useGalleryStore } from "../../store";
import { SearchDataType } from "../../../type";

export default function ModalWindow() {
  const filteredImages = useGalleryStore((state) => state.filteredImages);
  return (
    <ModalContainer filteredImages={filteredImages}>
      <div className="imageDataContainer">
        <img src={filteredImages[0]?.urls.thumb} />
      </div>
    </ModalContainer>
  );
}

const ModalContainer = styled.div<{ filteredImages: SearchDataType[] }>`
  width: 300px;
  height: 100px;
  background-color: white;
  display: ${(props) => (props.filteredImages.length > 0 ? "flex" : "none")};
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
