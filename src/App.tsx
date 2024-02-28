import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import axios from "axios";
import { useEffect } from "react";
import { useGalleryStore } from "./store";
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
    <MainContainer>
      <GlobalStyles />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
`;
export default App;
