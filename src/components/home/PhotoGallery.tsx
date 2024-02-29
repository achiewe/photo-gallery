import styled from "styled-components";
import { useGalleryStore } from "../../store";
import { PhotoesType } from "../../../type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

export default function PhotoGallery(): JSX.Element {
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  const inputValue = useGalleryStore((state) => state.inputValue);
  const page = 1; // Set your desired page number
  const perPage = 10; // Set your desired number of photos per page

  const { data: photoes, isLoading: photoesLoading } = useQuery({
    queryKey: ["photos", inputValue],
    queryFn: async () => {
      try {
        if (inputValue !== "") {
          console.log(inputValue);
          const response = await axios.get(
            `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}&per_page=${perPage}&query=${inputValue}`,
            {
              headers: { "X-Api-Key": accessKey },
            }
          );

          // Filter out airports with empty IATA codes
          return response.data;
        }
      } catch (error) {
        console.error("Error fetching airports:", error);
        throw error; // Rethrow the error to be handled by the caller
      }
    },
  });

  if (photoesLoading) {
    return <div>Loading...</div>; // Render a loading indicator while fetching data
  }

  if (!photoes) {
    return (
      <GalleryContainer>
        {fetchPhotoes.map((photo, index) => (
          <div key={index} className="imageContainer">
            <img src={photo.regularUrl} alt={photo.description} />
          </div>
        ))}
      </GalleryContainer>
    );
  }

  console.log(photoes, "me var potoebi");

  return (
    <GalleryContainer>
      {photoes.map((photo: any, index: number) => (
        <div key={index} className="imageContainer">
          <img src={photo.urls.thumb} alt={photo.description} />
        </div>
      ))}
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
