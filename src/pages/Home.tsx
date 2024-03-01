import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import PhotoGallery from "../components/home/PhotoGallery";
import InputField from "../components/home/InputField";
import { useGalleryStore } from "../store";
import { SearchDataType } from "../../type";

const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

interface HomeProps {
  photoes: SearchDataType[];
  photoesLoading: boolean;
}

export default function Home({
  photoes,
  photoesLoading,
}: HomeProps): JSX.Element {
  const setFetchPhotoes = useGalleryStore((state) => state.setFetchPhotoes);
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  const page = useGalleryStore((state) => state.page);
  const setPage = useGalleryStore((state) => state.setPage);
  const loading = useGalleryStore((state) => state.loading);
  const setLoading = useGalleryStore((state) => state.setLoading);
  const filteredImages = useGalleryStore((state) => state.filteredImages);

  useEffect(() => {
    fetchImages(); // Initial fetch on component mount

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]); // Update dependency to include page

  const fetchImages = async () => {
    try {
      setLoading(true);

      const perPage = 20;
      const response = await axios.get(
        `https://api.unsplash.com/photos/?client_id=${accessKey}&order_by=popular&page=${page}&per_page=${perPage}`
      );

      setFetchPhotoes(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    const bottomThreshold = 100; // Adjust as needed

    if (scrollTop + clientHeight > scrollHeight - bottomThreshold && !loading) {
      setPage(page + 1); // Increment the page state by 1
    }
  };

  return (
    <HomeContainer>
      <InputField />
      <PhotoGallery photoes={photoes} photoesLoading={photoesLoading} />
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
