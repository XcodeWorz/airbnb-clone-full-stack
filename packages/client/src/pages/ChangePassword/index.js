import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import withFullPageLayout from "./../../layouts/FullPageLayout";
import ChangePasswordView from "./ChangePasswordView";

const CHANGE_PASSWORD_MUTATION = gql`
  mutation CHANGE_PASSWORD_MUTATION($newPassword: String!, $key: String!) {
    changePassword(newPassword: $newPassword, key: $key) {
      errors {
        path
        message
      }
      result
    }
  }
`;

class ChangePassword extends Component {
  onFinish = values => {
    const {
      data: {
        changePassword: { errors, result }
      }
    } = values;

    if (errors && errors.length) {
      return null;
    }

    if (result) {
      const { history } = this.props;
      history.push("/login");
    }
  };
  render() {
    const {
      match: {
        params: { key }
      }
    } = this.props;
    return (
      <Mutation mutation={CHANGE_PASSWORD_MUTATION}>
        {(changePassword, { loading, error, data }) => {
          return (
            <ChangePasswordView
              error={error}
              data={data}
              loading={loading}
              onFinish={this.onFinish}
              token={key}
              changePassword={changePassword}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default withFullPageLayout(ChangePassword);
