// import { useQueryClient } from "react-query";
// import { SearchDataType } from "../../../type";
import { useGalleryStore } from "../../store";
import styled from "styled-components";
import PhotoesDataList from "./PhotoesDataList";
import { useState } from "react";

interface inputListProps {
  queryKeyData: string[];
}

export default function InputList({ queryKeyData }: inputListProps) {
  // const inputValue = useGalleryStore((state) => state.inputValue);

  const inputValueArray = useGalleryStore((state) => state.inputValueArray);

  const [selectedInputIndex, setSelectedInputIndex] = useState<number | null>(
    null
  );

  const handleClick = (index: number) => {
    setSelectedInputIndex(selectedInputIndex === index ? null : index);
  };

  return (
    <ListContainer>
      {inputValueArray.map((inputText, index) => (
        <div key={index} className="UlPhotoDataDiv">
          <ul onClick={() => handleClick(index)}>
            <li>{inputText}</li>
            <hr />
          </ul>

          {selectedInputIndex === index && (
            <PhotoesDataList inputText={inputText} />
          )}
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

  @media (min-width: 768px) {
    width: 500px;
  }

  .UlPhotoDataDiv {
    width: 100%;
    justify-content: center;
    align-items: center;

    ul:hover {
      background-color: #d9d9d9;
    }

    ul:focus {
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
  }
`;
