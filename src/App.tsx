import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import axios from "axios";
const airportsApiKey = import.meta.env.VITE_REACT_APP_ACCESS_KEY;

function App(): JSX.Element {
  const getImages = async () => {
    const response = await axios.get(
      "https://api.unsplash.com/photos/?client_id=YOUR_UNSPLASH_ACCESS_KEY&per_page=20"
    );
  };

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
