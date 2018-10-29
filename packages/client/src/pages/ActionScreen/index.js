import React, { Component } from "react";
import withFullLayout from "./../../layouts/FullPageLayout";

class ActionScreen extends Component {
  render() {
    const {
      location: { state }
    } = this.props;

    return <h3>{state && state.message ? state.message : "Congrats!"}</h3>;
  }
}

export default withFullLayout(ActionScreen);
