import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import PhotoGallery from "../components/home/PhotoGallery";
import InputField from "../components/home/InputField";
import { useGalleryStore } from "../store";
import { SearchDataType } from "../../type";

const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

interface HomeProps {
  queryKeyData: (string | number)[];
  photoesLoading: boolean;
  queryPhotoes: SearchDataType[];
}

export default function Home({
  queryKeyData,
  queryPhotoes,
  photoesLoading,
}: HomeProps): JSX.Element {
  const setFetchPhotoes = useGalleryStore((state) => state.setFetchPhotoes);
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  const page = useGalleryStore((state) => state.page);
  const perPage = useGalleryStore((state) => state.perPage);
  const setPage = useGalleryStore((state) => state.setPage);
  const loading = useGalleryStore((state) => state.loading);
  const setLoading = useGalleryStore((state) => state.setLoading);

  useEffect(() => {
    // Define fetchImages function inside useEffect to avoid warnings
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

        setFetchPhotoes([...fetchPhotoes, ...newPhotos]);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

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

  return (
    <HomeContainer>
      <InputField queryKeyData={queryKeyData} queryPhotoes={queryPhotoes} />
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
