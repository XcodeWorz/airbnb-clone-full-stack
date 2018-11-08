import React, { Component } from "react";
import styled from "styled-components";

const logoSvg = require("./../../assets/logo.svg");

const MainLayout = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
`;

const Header = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
`;

const withMainLayout = ChildComponent => {
  class FullPageLayout extends Component {
    render() {
      return (
        <MainLayout>
          <Header>
            <Logo src={logoSvg} alt="logo" />
          </Header>
          <Content>
            <ChildComponent {...this.props} />
          </Content>
        </MainLayout>
      );
    }
  }
  return FullPageLayout;
};

export default withMainLayout;
