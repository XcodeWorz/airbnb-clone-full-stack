import React, { Component } from "react";

export default class HomeView extends Component {
  render() {
    const { airbnbs } = this.props;
    return (
      <div>
        {airbnbs.map(airbnb => {
          return <div key={airbnb._id}>{airbnb.name}</div>;
        })}
      </div>
    );
  }
}
