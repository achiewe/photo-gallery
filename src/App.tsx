import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useGalleryStore } from "./store";
import Home from "./pages/Home";
import Header from "./components/Header";
const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

function App(): JSX.Element {
  const setFetchPhotoes = useGalleryStore((state) => state.setFetchPhotoes);
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);

  useEffect(() => {
    const getImages = async () => {
      const response = await axios.get(
        `https://api.unsplash.com/photos/?client_id=${accessKey}&order_by=popular&per_page=20`
      );

      const data = response.data;
      setFetchPhotoes(data);
    };
    getImages();
  }, []);

  return (
    <Router>
      <MainContainer>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/History" element={<History />} />
        </Routes>
      </MainContainer>
    </Router>
  );
}

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #f2f2f2;
`;
export default App;
