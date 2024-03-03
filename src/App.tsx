import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import History from "./pages/History";
import ModalWindow from "./components/home/ModalWindow";
import { useGalleryStore } from "./store";
import { SearchDataType } from "../type";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useEffect } from "react";
const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

function App(): JSX.Element {
  // Fetching filtered images and input value from custom store
  const filteredImages = useGalleryStore((state) => state.filteredImages);
  const inputValue = useGalleryStore((state) => state.inputValue);

  // Fetching photos based on input value using react-query
  const fetchPhotos = async ({ pageParam = 1 }) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos/?client_id=${accessKey}&page=${pageParam}&per_page=20&query=${inputValue}`,
        {
          headers: { Authorization: `${accessKey}` },
        }
      );

      return response.data.results;
    } catch (error) {
      console.error("Error fetching photos:", error);
      throw error;
    }
  };

  // Query key for useInfiniteQuery hook
  const queryKey = ["photos", inputValue];

  // Fetching photos using infinite query
  const {
    data: queryPhotoes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: photoesLoading,
  } = useInfiniteQuery(queryKey, fetchPhotos, {
    getNextPageParam: (lastPage, allPages) => {
      // If there are no more pages, return undefined
      if (lastPage.length < 20) return;

      // Otherwise, return the next page number
      return allPages.length + 1;
    },
  });

  // Effect for infinite scroll pagination
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const bottomThreshold = 100;

      if (
        scrollTop + clientHeight > scrollHeight - bottomThreshold &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        // Fetch the next page
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Rendering main application structure
  return (
    <Router>
      <MainContainer filteredImages={filteredImages}>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                queryPhotoes={queryPhotoes}
                photoesLoading={photoesLoading}
              />
            }
          />
          <Route path="/History" element={<History />} />
        </Routes>
        <ModalWindow />
        <div className="overlay"></div>
      </MainContainer>
    </Router>
  );
}

const MainContainer = styled.div<{ filteredImages: SearchDataType[] }>`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  gap: 40px;
  background-color: #f2f2f2;

  .overlay {
    width: 100%;
    height: 100%;
    display: ${(props) => (props.filteredImages.length > 0 ? "flex" : "none")};
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
export default App;
