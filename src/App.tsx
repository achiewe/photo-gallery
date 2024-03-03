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
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

function App(): JSX.Element {
  const [pageQuery, setPageQuery] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [perPageQuery] = useState<number>(20);

  const filteredImages = useGalleryStore((state) => state.filteredImages);
  const inputValue = useGalleryStore((state) => state.inputValue);

  const queryKey = ["photos", inputValue];
  console.log(queryKey, "mevar querykey");
  const { data: queryPhotoes, isLoading: photoesLoading } = useQuery(
    queryKey,
    async () => {
      try {
        if (inputValue !== "") {
          setLoading(true);
          const response = await axios.get(
            `https://api.unsplash.com/search/photos/?client_id=${accessKey}&page=${pageQuery}&per_page=${perPageQuery}&query=${inputValue}`,
            {
              headers: { Authorization: `${accessKey}` },
            }
          );

          return response.data.results;
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const bottomThreshold = 100;

      if (
        scrollTop + clientHeight > scrollHeight - bottomThreshold &&
        !loading
      ) {
        // Increase the number of photos to be loaded

        setPageQuery(pageQuery + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [perPageQuery, pageQuery, queryPhotoes]);
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
                photoesLoading={photoesLoading}
                queryPhotoes={queryPhotoes}
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
