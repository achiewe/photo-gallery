import styled from "styled-components";

export default function ModalWindow() {
  return <ModalContainer></ModalContainer>;
}

const ModalContainer = styled.div`
  width: 300px;
  height: 100px;
  position: absolute;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  left: 50%;
  right: 50%;
`;
