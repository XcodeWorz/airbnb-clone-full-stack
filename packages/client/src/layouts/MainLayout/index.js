import React, { Component } from "react";
import styled from "styled-components";

import { Header } from "./components/Header";

const MainLayoutWrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Content = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
`;

const withMainLayout = ChildComponent => {
  class MainLayout extends Component {
    render() {
      const { session } = this.props;
      return (
        <MainLayoutWrapper>
          <Header session={session} />
          <Content>
            <ChildComponent {...this.props} />
          </Content>
        </MainLayoutWrapper>
      );
    }
  }
  return MainLayout;
};

export default withMainLayout;
