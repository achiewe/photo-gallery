import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  // Getting current pathname
  const pathname = window.location.pathname;
  useNavigate();
  return (
    <HeaderContainer pathname={pathname}>
      <Link className="HomeLink" to="/">
        Home
      </Link>
      <Link className="HistoryLink" to="/History">
        History
      </Link>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header<{ pathname: string }>`
  width: 200px;
  display: flex;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #bfbfbf;
  margin-top: 20px;
  border-radius: 20px;
  padding: 0 20px;

  @media (min-width: 768px) {
    width: 300px;
    gap: 70px;
    padding: 0 50px;
  }

  a {
    text-decoration: none;
    color: white;
    font-size: 18px;
    font-weight: 600;
  }

  .HomeLink {
    color: ${(props) => (props.pathname === "/" ? "#000000" : "")};
  }

  .HistoryLink {
    color: ${(props) => (props.pathname === "/History" ? "#000000" : "")};
  }

  a:hover {
    color: #000000;
  }
`;
