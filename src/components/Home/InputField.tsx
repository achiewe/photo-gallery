import styled from "styled-components";
import { useGalleryStore } from "../../store";
import { ChangeEvent } from "react";

export default function InputField() {
  const inputValue = useGalleryStore((state) => state.inputValue);
  const setInputValue = useGalleryStore((state) => state.setInputValue);

  return (
    <Input
      type="text"
      placeholder="ძებნა"
      value={inputValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      }}
    ></Input>
  );
}

const Input = styled.input`
  width: 200px;
  height: 40px;
  outline: none;
  padding-left: 10px;
  border: none;
  border-radius: 10px;
`;
