import React from "react";

class LogoutView extends React.PureComponent {
  async componentDidMount() {
    await this.props.logout();
    this.props.onFinish();
  }

  render() {
    return null;
  }
}

export default LogoutView;