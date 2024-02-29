import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import PhotoGallery from "../components/home/PhotoGallery";
import InputField from "../components/home/InputField";
import { PhotoesType } from "../../type";
import { useGalleryStore } from "../store";

const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

export default function Home(): JSX.Element {
  const setFetchPhotoes = useGalleryStore((state) => state.setFetchPhotoes);
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  const page = useGalleryStore((state) => state.page);
  const setPage = useGalleryStore((state) => state.setPage);
  const loading = useGalleryStore((state) => state.loading);
  const setLoading = useGalleryStore((state) => state.setLoading);

  // useEffect(() => {
  //   fetchImages();
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [page]); // Update dependency to include page

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);

        const perPage = 20;
        const response = await axios.get(
          `https://api.unsplash.com/photos/?client_id=${accessKey}&order_by=popular&page=${page}&per_page=${perPage}`
        );
        const processedData: PhotoesType[] = response.data.map(
          (photo: any) => ({
            downloads: photo.downloads,
            views: photo.views,
            likes: photo.likes,
            id: photo.id,
            regularUrl: photo.urls.thumb,
            altDescription: photo.alt_description,
            description: photo.description,
          })
        );

        // Update the photos state based on the page
        if (page === 1) {
          setFetchPhotoes(processedData);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // const handleScroll = () => {
  //   const windowHeight = window.innerHeight;
  //   const docHeight = document.documentElement.scrollHeight;
  //   const scrollTop = document.documentElement.scrollTop;
  //   const bottomThreshold = 100; // Adjust as needed

  //   if (windowHeight + scrollTop > docHeight - bottomThreshold && !loading) {
  //     setPage(page + 1); // Increment the page state by 1
  //   }
  // };

  return (
    <HomeContainer>
      <InputField />
      <PhotoGallery />
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
