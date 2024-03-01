import styled from "styled-components";
import { useGalleryStore } from "../../store";
import { SearchDataType } from "../../../type";
import likePng from "../../../public/assets/like.png";
import ViewPng from "../../../public/assets/view.png";
import downoloadPng from "../../../public/assets/download.png";

export default function ModalWindow() {
  const filteredImages = useGalleryStore((state) => state.filteredImages);
  return (
    <ModalContainer filteredImages={filteredImages}>
      <div className="imageDataContainer">
        <img src={filteredImages[0]?.urls.thumb} />
        <div className="InfoDiv">
          <img className="likeViewDownPng" src={likePng} alt="like png" />
          <h2>likes: {filteredImages[0]?.likes}</h2>
        </div>
        <div className="InfoDiv">
          <img className="likeViewDownPng" src={ViewPng} alt="view png" />
          <h2>View: {filteredImages[0]?.likes}</h2>
        </div>
        <div className="InfoDiv">
          <img
            className="likeViewDownPng"
            src={downoloadPng}
            alt="download png"
          />
          <h2>Downloads: {filteredImages[0]?.likes}</h2>
        </div>
      </div>
    </ModalContainer>
  );
}

const ModalContainer = styled.div<{ filteredImages: SearchDataType[] }>`
  width: 200px;
  height: 300px;
  background-color: white;
  display: ${(props) => (props.filteredImages.length > 0 ? "flex" : "none")};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 4%;
  z-index: 1;

  h2 {
    font-size: 18px;
  }

  .imageDataContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;

    .InfoDiv {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 5px;

      .likeViewDownPng {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
