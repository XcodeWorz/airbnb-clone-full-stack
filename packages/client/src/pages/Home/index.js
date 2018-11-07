import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import withFullPageLayout from "./../../layouts/FullPageLayout";

const ME_QUERY = gql`
  {
    me {
      result {
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

class Home extends Component {
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ loading, error, data }) => {
          console.log("me", data);
          return <div>Home</div>;
        }}
      </Query>
    );
  }
}

export default withFullPageLayout(Home);
