import React, { Component } from "react";
import styled from "styled-components";

import { Header } from "./components/Header";

const MainLayoutWrapper = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
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
