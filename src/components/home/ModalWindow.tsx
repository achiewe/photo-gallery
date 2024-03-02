import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGalleryStore } from "../../store";
import { SearchDataType, photoStatsType } from "../../../type";
import likePng from "../../../public/assets/like.png";
import ViewPng from "../../../public/assets/view.png";
import downoloadPng from "../../../public/assets/download.png";
import closePng from "../../../public/assets/close.png";
const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

export default function ModalWindow() {
  const filteredImages = useGalleryStore((state) => state.filteredImages);
  const setFilteredImages = useGalleryStore((state) => state.setFilteredImages);
  const [photoStats, setPhotoStats] = useState<photoStatsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotoStatistics = async () => {
      try {
        const photoId = filteredImages[0]?.id;
        const response = await axios.get(
          `https://api.unsplash.com/photos/${photoId}/statistics`,
          {
            headers: { Authorization: `Client-ID ${accessKey}` },
          }
        );
        setPhotoStats(response.data);
      } catch (error) {
        console.error("Error fetching photo statistics:", error);
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };

    if (filteredImages[0]?.id) {
      setLoading(true); // Set loading to true before fetching
      fetchPhotoStatistics();
    }
  }, [filteredImages]);

  if (!filteredImages[0]?.id) {
    return null;
  }

  return (
    <ModalContainer filteredimages={filteredImages}>
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
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <div className="InfoDiv">
              <img className="likeViewDownPng" src={likePng} alt="like png" />
              <h2>Likes: {photoStats?.likes.total}</h2>
            </div>
            <div className="InfoDiv">
              <img className="likeViewDownPng" src={ViewPng} alt="view png" />
              <h2>Views: {photoStats?.views.total}</h2>
            </div>
            <div className="InfoDiv">
              <img
                className="likeViewDownPng"
                src={downoloadPng}
                alt="download png"
              />
              <h2>Downloads: {photoStats?.downloads.total}</h2>
            </div>
          </>
        )}
      </div>
    </ModalContainer>
  );
}

const ModalContainer = styled.div<{ filteredimages: SearchDataType[] }>`
  width: 300px;
  background-color: white;
  display: ${(props) => (props.filteredimages.length > 0 ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  padding: 15px 0;
  border-radius: 20px;
  top: 30%;
  z-index: 1;

  @media (min-width: 768px) {
    width: 600px;
    top: 5%;
  }

  @media (min-width: 1024px) {
    top: 10%;
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
      right: 10px;
      top: -6px;
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
