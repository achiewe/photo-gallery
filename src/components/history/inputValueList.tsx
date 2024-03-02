import { SearchDataType } from "../../../type";
import { useGalleryStore } from "../../store";
import styled from "styled-components";

interface inputListProps {
  queryPhotoes: SearchDataType[];
}

export default function inputList({ queryPhotoes }: inputListProps) {
  const inputValueArray = useGalleryStore((state) => state.inputValueArray);
  console.log(inputValueArray);

  return (
    <ListContainer>
      {/* {inputValueArray.map((inputText, index) => (
        <ul key={index}>
          <li>{inputText}</li>
          <hr />
        </ul>
      ))} */}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;

  :hover {
    background-color: #d9d9d9;
  }

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    gap: 10px;
    cursor: pointer;

    li {
      font-size: 16px;
      font-weight: 600;
      color: black;
      list-style-type: none;
      @media (min-width: 768px) {
        font-size: 20px;
      }
    }

    hr {
      width: 100%;
      border: 1px solid gray;
      opacity: 0.3;
    }
  }
`;
