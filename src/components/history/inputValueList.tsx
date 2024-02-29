import { useGalleryStore } from "../../store";
import styled from "styled-components";

export default function inputList() {
  const inputValueArray = useGalleryStore((state) => state.inputValueArray);
  return (
    <ListContainer>
      {inputValueArray.map((inputText, index) => (
        <div className="hrInputDiv" key={index}>
          <h1>{inputText}</h1>
          <hr />
        </div>
      ))}
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
    background-color: gray;
  }

  .hrInputDiv {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    cursor: pointer;

    hr {
      width: 100%;
      border: 1px solid gray;
      opacity: 0.3;
    }
  }

  h1 {
    font-size: 16px;
    color: black;
  }
`;
