import styled from "styled-components";
import { useGalleryStore } from "../store";

export default function History() {
  const inputValueArray = useGalleryStore((state) => state.inputValueArray);

  return (
    <MainCont inputValueArray={inputValueArray}>
      {inputValueArray.length === 0 ? (
        <p className="emptyPTag">History is empty</p>
      ) : (
        <div className="inputTextDiv">
          {inputValueArray.map((inputText, index) => (
            <div className="hrInputDiv" key={index}>
              <h1>{inputText}</h1>
              <hr />
            </div>
          ))}
        </div>
      )}
    </MainCont>
  );
}

const MainCont = styled.div<{ inputValueArray: string[] }>`
  width: 200px;
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .emptyPTag {
    font-size: 20px;
    font-weight: 600;
  }

  .inputTextDiv {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    gap: 10px;
  }

  .hrInputDiv {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    gap: 5px;

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
