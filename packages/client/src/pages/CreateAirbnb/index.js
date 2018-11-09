import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import CreateAirbnbView from "./CreateAirbnbView";
import withMainLayout from "./../../layouts/MainLayout";

const CREATE_AIRBNB_MUTATION = gql`
  mutation createAirbnb(
    $name: String!
    $image: Upload
    $description: String!
    $category: String!
    $price: Float!
    $guests: Int!
    $beds: Int!
    $baths: Int!
    $latitude: Float!
    $longitude: Float!
    $amenities: [String]
  ) {
    createAirbnb(
      data: {
        name: $name
        image: $image
        description: $description
        category: $category
        price: $price
        guests: $guests
        beds: $beds
        baths: $baths
        latitude: $latitude
        longitude: $longitude
        amenities: $amenities
      }
    ) {
      errors {
        path
        message
      }
      result
    }
  }
`;

class CreateAirbnb extends Component {
  onFinish = values => {
    const {
      data: {
        createAirbnb: { errors }
      }
    } = values;

    if (errors) return null;
    const { history } = this.props;
    history.push("/");
  };

  render() {
    return (
      <Mutation mutation={CREATE_AIRBNB_MUTATION}>
        {(createAirbnb, { loading, error, data }) => {
          return (
            <CreateAirbnbView
              loading={loading}
              onFinish={this.onFinish}
              createAirbnb={createAirbnb}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default withMainLayout(CreateAirbnb);
