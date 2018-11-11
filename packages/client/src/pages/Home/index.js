import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import withMainLayout from "./../../layouts/MainLayout";
import HomeView from "./HomeView";

class Home extends Component {
  render() {
    const FIND_AIRBNBS_QUERY = gql`
      {
        findAirbnbs {
          _id
          name
          price
          images
        }
      }
    `;
    return (
      <Query query={FIND_AIRBNBS_QUERY}>
        {({ loading, error, data }) => {
          if (error || !data.findAirbnbs) return null;
          return <HomeView loading={loading} airbnbs={data.findAirbnbs} />;
        }}
      </Query>
    );
  }
}

export default withMainLayout(Home);
