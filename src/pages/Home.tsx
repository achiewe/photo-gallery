import styled from "styled-components";
import PhotoGallery from "../components/Home/PhotoGallery";
import InputField from "../components/Home/InputField";

export default function Home() {
  return (
    <HomeContainer>
      <PhotoGallery />
      <InputField />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
