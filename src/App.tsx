import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { QueryClientProvider, QueryClient } from "react-query";
import History from "./pages/History";
import ModalWindow from "./components/home/ModalWindow";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MainContainer>
          <GlobalStyles />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/History" element={<History />} />
          </Routes>
          <ModalWindow />
          <div className="overlay"></div>
        </MainContainer>
      </Router>
    </QueryClientProvider>
  );
}

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  gap: 40px;
  background-color: #f2f2f2;

  /* .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
  } */
`;
export default App;
