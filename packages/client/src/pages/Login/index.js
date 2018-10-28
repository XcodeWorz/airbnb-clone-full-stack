import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import withFullPageLayout from "./../../layouts/FullPageLayout";
import LoginView from "./LoginView";

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        path
        message
      }
      token
    }
  }
`;

class Login extends Component {
  onFinish = values => {
    const {
      data: {
        login: { errors }
      }
    } = values;

    const { history } = this.props;

    if (!errors) history.push("/");
  };
  render() {
    return (
      <Mutation mutation={LOGIN_MUTATION}>
        {(login, { loading, error, data }) => {
          return (
            <LoginView
              onFinish={this.onFinish}
              login={login}
              error={error}
              data={data}
              loading={loading}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default withFullPageLayout(Login);