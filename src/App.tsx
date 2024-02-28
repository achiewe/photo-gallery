import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useGalleryStore } from "./store";
import Home from "./pages/Home";
import Header from "./components/Header";
import History from "./pages/History";
import { PhotoesType } from "../type";
const accessKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

function App(): JSX.Element {
  const setFetchPhotoes = useGalleryStore((state) => state.setFetchPhotoes);
  const fetchPhotoes = useGalleryStore((state) => state.fetchPhotoes);
  console.log(fetchPhotoes);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/photos/?client_id=${accessKey}&order_by=popular&per_page=20`
        );

        // const processedData: PhotoesType[] = response.data.map(
        //   (photo: any) => ({
        //     downloads: photo.downloads,
        //     views: photo.views,
        //     likes: photo.likes,
        //     regularUrl: photo.urls.regular,
        //     altDescription: photo.alt_description,
        //     description: photo.description,
        //   })
        // );

        setFetchPhotoes(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
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
  align-items: center;
  padding-top: 20px;
  gap: 40px;
  background-color: #f2f2f2;
`;
export default App;
