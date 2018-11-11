import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";

import * as serviceWorker from "./serviceWorker";
import { client } from "./apollo";
import { Routes } from "./routes";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import "./style.less";

const theme = {
  primaryColor: "#FF5A5F",
  focusColor: "#ff8282",
  lightFocusColor: "rgba(255, 90, 95, 0.2)",
  linkColor: "#008489",
  textColor: "#484848",
  textColorSecondary: "#585A3A",
  borderColorBase: "#E5E5E5",
  boxShadowBase: "0 2px 4px rgba(0,0,0,0.1)"
};

const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Routes />
        <GlobalStyle />
      </React.Fragment>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
