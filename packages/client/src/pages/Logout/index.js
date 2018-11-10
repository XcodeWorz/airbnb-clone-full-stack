import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import LogoutView from "./LogoutView";

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout
  }
`;
class Logout extends Component {
  onFinish = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <Mutation mutation={LOGOUT_MUTATION}>
        {logout => {
          return <LogoutView logout={logout} onFinish={this.onFinish} />;
        }}
      </Mutation>
    );
  }
}

export default Logout;
