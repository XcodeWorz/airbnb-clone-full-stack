import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import withFullPageLayout from "./../../layouts/FullPageLayout";
import ForgotPasswordView from "./ForgotPasswordView";

const FORGOT_PASSWORD_MUTATION = gql`
  mutation FORGOT_PASSWORD_MUTATION($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

class ForgotPassword extends Component {
  onFinish = values => {
    const {
      data: { sendForgotPasswordEmail }
    } = values;
    if (sendForgotPasswordEmail) {
      const { history } = this.props;
      history.push("/m", {
        message: "Please, check your email to change your password!"
      });
    }
    return null;
  };
  render() {
    return (
      <Mutation mutation={FORGOT_PASSWORD_MUTATION}>
        {(sendForgotPasswordEmail, { loading, error, data }) => {
          return (
            <ForgotPasswordView
              onFinish={this.onFinish}
              sendForgotPasswordEmail={sendForgotPasswordEmail}
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

export default withFullPageLayout(ForgotPassword);
