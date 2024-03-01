// History.js
import styled from "styled-components";
import { useGalleryStore } from "../store";
import InputList from "../components/history/inputValueList"; // Import the component with correct casing
import { SearchDataType } from "../../type";

interface HistoryProps {
  queryPhotoes: SearchDataType[];
}

export default function History({ queryPhotoes }: HistoryProps) {
  const inputValueArray = useGalleryStore((state) => state.inputValueArray);

  return (
    <MainCont inputValueArray={inputValueArray}>
      {inputValueArray.length === 0 ? <p>History is empty</p> : <InputList />}
    </MainCont>
  );
}

const MainCont = styled.div<{ inputValueArray: string[] }>`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 20px;
    font-weight: 600;
  }
`;
