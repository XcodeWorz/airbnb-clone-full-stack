import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import withMainLayout from "../../layouts/MainLayout";

import AirbnbDetailsView from "./AirbnbDetailsView";

const AIRBNB_DETAILS_QUERY = gql`
  query airbnbDetails($id: ID!) {
    airbnbDetails(id: $id) {
      _id
      name
      description
      category
      price
      guests
      beds
      baths
      location {
        coordinates
      }
      amenities
      images
      host {
        _id
        email
      }
    }
  }
`;

class AirbnbDetails extends Component {
  notExisting = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const {
      match: {
        params: { airbnbId }
      }
    } = this.props;
    return (
      <Query query={AIRBNB_DETAILS_QUERY} variables={{ id: airbnbId }}>
        {({ loading, error, data }) => {
          if (!data.airbnbDetails && !loading) this.notExisting();
          return (
            <AirbnbDetailsView data={data} error={error} loading={loading} />
          );
        }}
      </Query>
    );
  }
}

export default withMainLayout(AirbnbDetails);
