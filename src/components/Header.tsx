import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const path = window.location.pathname;
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <Link to="/">Home</Link>
      <Link to="/History">History</Link>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 200px;
  display: flex;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #bfbfbf;
  border-radius: 20px;
  gap: 30px;

  a {
    text-decoration: none;
    color: white;
    font-size: 18px;
    font-weight: 600;
  }

  a:hover {
    color: #000000;
  }
`;
