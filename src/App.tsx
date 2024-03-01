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
const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

function App(): JSX.Element {
  const filteredImages = useGalleryStore((state) => state.filteredImages);
  const inputValue = useGalleryStore((state) => state.inputValue);
  const page = useGalleryStore((state) => state.page);
  const perPage = useGalleryStore((state) => state.perPage);

  filteredImages.length > 0
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  const queryKey = ["photos", inputValue]; // Include inputValue in queryKey
  const { data: photoes, isLoading: photoesLoading } = useQuery(
    queryKey,

    async () => {
      try {
        if (inputValue !== "") {
          const response = await axios.get(
            `https://api.unsplash.com/search/photos/?client_id=${accessKey}&page=${page}&per_page=${perPage}&query=${inputValue}`,
            {
              headers: { Authorization: `${accessKey}` },
            }
          );

          return response.data.results;
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
      }
    }
  );
  return (
    <Router>
      <MainContainer filteredImages={filteredImages}>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home photoes={photoes} photoesLoading={photoesLoading} />}
          />
          <Route path="/History" element={<History photoes={photoes} />} />
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
