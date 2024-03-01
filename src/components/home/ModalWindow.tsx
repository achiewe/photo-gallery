import styled from "styled-components";
import { useGalleryStore } from "../../store";
import { SearchDataType } from "../../../type";
import likePng from "../../../public/assets/like.png";
import ViewPng from "../../../public/assets/view.png";
import downoloadPng from "../../../public/assets/download.png";
import closePng from "../../../public/assets/close.png";

export default function ModalWindow() {
  const filteredImages = useGalleryStore((state) => state.filteredImages);
  const setFilteredImages = useGalleryStore((state) => state.setFilteredImages);
  return (
    <ModalContainer filteredImages={filteredImages}>
      <div className="imageDataContainer">
        <img
          className="closePng"
          src={closePng}
          alt="close png"
          onClick={() => {
            setFilteredImages([]);
          }}
        />
        <img
          src={filteredImages[0]?.urls.thumb}
          srcSet={`${filteredImages[0]?.urls.thumb} 375w, ${filteredImages[0]?.urls.small} 768w`}
          sizes="(max-width: 768px) 375px, 768px"
        />
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
  width: 300px;
  background-color: white;
  display: ${(props) => (props.filteredImages.length > 0 ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  padding: 15px 0;
  top: 30%;
  z-index: 1;

  @media (min-width: 768px) {
    width: 600px;
    top: 5%;
  }
  h2 {
    font-size: 18px;
  }

  .imageDataContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 15px;

    .closePng {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 5px;
      top: -10px;
      cursor: pointer;
    }

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
