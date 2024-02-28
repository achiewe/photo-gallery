import styled from "styled-components";

export default function InputField() {
  return <Input type="text" placeholder="ძებნა"></Input>;
}

const Input = styled.input`
  width: 200px;
  height: 40px;
  outline: none;
  padding-left: 10px;
  border: none;
  border-radius: 10px;
`;
