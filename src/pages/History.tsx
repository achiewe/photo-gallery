// History.js
import styled from "styled-components";
import { useGalleryStore } from "../store";
import InputList from "../components/history/inputValueList";
// import { SearchDataType } from "../../type";

interface HistoryProps {
  queryKeyData: (string | number)[];
}

export default function History({ queryKeyData }: HistoryProps) {
  const inputValueArray = useGalleryStore((state) => state.inputValueArray);

  return (
    <MainCont>
      {Object.keys(inputValueArray).length === 0 ? (
        <p>History is empty</p>
      ) : (
        <InputList queryKeyData={queryKeyData} />
      )}
    </MainCont>
  );
}

const MainCont = styled.div`
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
