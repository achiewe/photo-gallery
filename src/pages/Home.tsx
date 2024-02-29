import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import PhotoGallery from "../components/Home/PhotoGallery";
import InputField from "../components/Home/InputField";
import { PhotoesType } from "../../type";
import { useGalleryStore } from "../store";

const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

export default function Home(): JSX.Element {
  const [perPage, setPerPage] = useState<number>(20);
  const setFetchPhotoes = useGalleryStore((state) => state.setFetchPhotoes);
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  const page = useGalleryStore((state) => state.page);
  const setPage = useGalleryStore((state) => state.setPage);
  const loading = useGalleryStore((state) => state.loading);
  const setLoading = useGalleryStore((state) => state.setLoading);

  console.log(page);

  // useEffect(() => {
  //   console.log("useEffect executed");
  //   console.log("fetchPhotoes length:", fetchPhotoes.length);
  //   // Fetch images only if no images are already fetched or if it's the first render
  //   if (fetchPhotoes.length === 0 && page === 1) {
  //     fetchImages();
  //   }
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [fetchPhotoes.length, page]); // Updated dependency array

  console.log(fetchPhotoes, "mevar fetch potoebi");

  const fetchImages = async () => {
    try {
      setLoading(true);
      let perPageValue = perPage; // Set perPageValue based on the state
      if (page === 1) {
        perPageValue = 20; // Set perPage to 20 for the initial page
      } else {
        perPageValue = 40; // Set perPage to 40 for subsequent pages
      }
      console.log(perPageValue, "mevar raodenoba");

      const response = await axios.get(
        `https://api.unsplash.com/photos/?client_id=${accessKey}&order_by=popular&page=${page}&per_page=${perPageValue}`
      );
      const processedData: PhotoesType[] = response.data.map((photo: any) => ({
        downloads: photo.downloads,
        views: photo.views,
        likes: photo.likes,
        id: photo.id,
        regularUrl: photo.urls.thumb,
        altDescription: photo.alt_description,
        description: photo.description,
      }));
      if (page === 1) {
        setFetchPhotoes(processedData);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // const handleScroll = () => {
  //   console.log("handleScroll called");
  //   const windowHeight = window.innerHeight;
  //   const docHeight = document.documentElement.scrollHeight;
  //   const scrollTop = document.documentElement.scrollTop;
  //   const bottomThreshold = 100; // Adjust as needed

  //   if (windowHeight + scrollTop > docHeight - bottomThreshold && !loading) {
  //     fetchImages();
  //     setPage(page + 1); // Increment the page state by 1
  //     setPerPage(perPage + 20)
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
