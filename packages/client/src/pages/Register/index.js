import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import withFullPageLayout from "./../../layouts/FullPageLayout";
import RegisterView from "./RegisterView";

const REGISTER_MUTATION = gql`
  mutation REGISTER_MUTATION(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      confirmPassword: $confirmPassword
    ) {
      errors {
        path
        message
      }
      token
    }
  }
`;

class Register extends Component {
  onFinish = values => {
    const {
      data: {
        register: { errors }
      }
    } = values;

    const { history } = this.props;

    if (!errors) history.push("/");
  };
  render() {
    return (
      <Mutation mutation={REGISTER_MUTATION}>
        {(register, { loading, error, data }) => {
          return (
            <RegisterView
              onFinish={this.onFinish}
              register={register}
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

export default withFullPageLayout(Register);
