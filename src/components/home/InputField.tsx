import { useState } from "react";
import styled from "styled-components";
import { useGalleryStore } from "../../store";
import { ChangeEvent } from "react";

export default function InputField() {
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const inputValue = useGalleryStore((state) => state.inputValue);
  const setInputValue = useGalleryStore((state) => state.setInputValue);
  const setInputValueArray = useGalleryStore(
    (state) => state.setInputValueArray
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Clear any existing timeout
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    // Set a new timeout to trigger the search after 2000 milliseconds
    const newTimeoutId = window.setTimeout(() => {
      if (value.trim() !== "") {
        // Update inputValueArray with the current inputValue
        setInputValueArray({ inputValue: value });
      }
    }, 2000);

    // Update the state with the new timeout ID
    setTimeoutId(newTimeoutId);

    // Update input value
    setInputValue(value);
  };
  return (
    <Input
      type="text"
      placeholder="Search"
      value={inputValue}
      onChange={handleInputChange}
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

  @media (min-width: 768px) {
    width: 300px;
  }
`;
