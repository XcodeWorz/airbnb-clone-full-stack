import React, { Component } from "react";
import { Skeleton, Divider } from "antd";

export default class AirbnbDetailsView extends Component {
  render() {
    console.log(this.props);
    const {
      loading,
      data: { airbnbDetails }
    } = this.props;

    if (loading || !airbnbDetails) return <Skeleton />;

    return (
      <div>
        <div>{airbnbDetails.category}</div>
        <h3>{airbnbDetails.name}</h3>
        <div>
          <div>{airbnbDetails.guests} guests</div>
          <div>{airbnbDetails.beds} beds</div>
          <div>{airbnbDetails.baths} baths</div>
        </div>
        <Divider />
        <div>{airbnbDetails.description}</div>
        <Divider />
        <div>
          {airbnbDetails.amenities.map((amenity, i) => {
            return <div key={i}>{amenity}</div>;
          })}
        </div>
      </div>
    );
  }
}
