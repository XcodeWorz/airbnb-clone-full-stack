import React from "react";
import FancyRoute from "./../FancyRoute";
import { Redirect } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

class AuthRoute extends React.Component {
  render() {
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
    return (
      <Query query={ME_QUERY}>
        {({ loading, error, data }) => {
          if (!data || loading) return null;
          if (
            this.props.needsAuth ||
            error ||
            !data.me ||
            (data.me.errors && data.me.errors.length)
          )
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { next: this.props.path }
                }}
              />
            );
          const sessionInfo = data.me.result || {};
          return <FancyRoute session={sessionInfo} {...this.props} />;
        }}
      </Query>
    );
  }
}

export default AuthRoute;
