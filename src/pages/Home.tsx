import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import PhotoGallery from "../components/home/PhotoGallery";
import InputField from "../components/home/InputField";
import { useGalleryStore } from "../store";
import { SearchDataType } from "../../type";
import { InfiniteData } from "react-query";

// Fetching access key from environment variables
const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

// Interface defining props for Home component
interface HomeProps {
  photoesLoading: boolean;
  queryPhotoes: InfiniteData<SearchDataType[]> | undefined;
}

export default function Home({
  queryPhotoes,
  photoesLoading,
}: HomeProps): JSX.Element {
  // Accessing state and setter functions from custom store
  const setFetchPhotoes = useGalleryStore((state) => state.setFetchPhotoes);
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  const page = useGalleryStore((state) => state.page);
  const perPage = useGalleryStore((state) => state.perPage);
  const setPage = useGalleryStore((state) => state.setPage);
  const loading = useGalleryStore((state) => state.loading);
  const setLoading = useGalleryStore((state) => state.setLoading);

  // Effect for fetching images and handling pagination
  useEffect(() => {
    const fetchImages = async (page: number, perPage: number) => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://api.unsplash.com/photos/?client_id=${accessKey}&order_by=popular&page=${page}&per_page=${perPage}`
        );

        const newPhotos = response.data.filter((photo: SearchDataType) => {
          return !fetchPhotoes.some(
            (existingPhoto: SearchDataType) => existingPhoto.id === photo.id
          );
        });

        // Update state with new fetched images
        setFetchPhotoes([...fetchPhotoes, ...newPhotos]);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    // Scroll event handler for pagination
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const bottomThreshold = 100;

      if (
        scrollTop + clientHeight > scrollHeight - bottomThreshold &&
        !loading
      ) {
        setPage(page + 1);
      }
    };

    // Call fetchImages when page changes
    fetchImages(page, perPage);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, perPage]); // Run effect when page or perPage changes

  console.log(fetchPhotoes);
  return (
    <HomeContainer>
      <InputField />
      <PhotoGallery
        queryPhotoes={queryPhotoes}
        photoesLoading={photoesLoading}
      />
      {loading && <Loading>Loading...</Loading>}
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Loading = styled.div`
  margin-top: 20px;
  font-size: 16px;
`;
