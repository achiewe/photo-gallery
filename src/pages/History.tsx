import styled from "styled-components";
import { useGalleryStore } from "../store";

export default function History() {
  const inputValueArray = useGalleryStore((state) => state.inputValueArray);
  return (
    <MainCont>
      {inputValueArray.map((inputText) => {
        return <h1 key={inputText}>{inputText}</h1>;
      })}
      <div> </div>
    </MainCont>
  );
}

const MainCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;
