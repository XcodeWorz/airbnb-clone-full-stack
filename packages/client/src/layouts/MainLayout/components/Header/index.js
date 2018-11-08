import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const logoSvg = require("./../../../../assets/logo.svg");

const LogoWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;

const Logo = styled.img`
  width: 33px;
  height: 33px;
`;

const HeaderWrapper = styled.div`
  position: relative;
  height: 80px;
  max-height: 80px;
  width: 100%;
`;

const HeaderContent = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: relative;
  line-height: 80px;
  box-shadow: ${props => props.theme.boxShadowBase};
`;

const Navbar = styled.ul`
  position: relative;
  list-style: none;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  margin: 0;
  li {
    padding: 0 8px;
    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom: 1px solid ${props => props.theme.textColor};
    }

    a {
      color: ${props => props.theme.textColor}
      font-weight: 600;
      padding: 8px;
    }
  }
`;

const navBarList = session => {
  return session.email ? (
    <React.Fragment>
      <li> {session.email} </li>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <li>
        {" "}
        <Link to="/register">Sign up</Link>{" "}
      </li>
      <li>
        {" "}
        <Link to="/login">Login</Link>{" "}
      </li>
    </React.Fragment>
  );
};

export const Header = ({ session }) => {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <LogoWrapper>
          <Logo src={logoSvg} alt="logo" />
        </LogoWrapper>
        <Navbar>{navBarList(session)}</Navbar>
      </HeaderContent>
    </HeaderWrapper>
  );
};
