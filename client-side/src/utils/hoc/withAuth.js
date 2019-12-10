import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import cookies from "../cookies";

export function withAuth(ComposedComponent) {
  class WrappedComponent extends React.Component {
    render() {
      const { isSignedIn } = this.props;

      if (!isSignedIn) return <Redirect to="/sign-in" />;
      else return <ComposedComponent {...this.props} />;
    }
  }

  return connect(({ auth }) => ({
    isSignedIn: auth.userData.chuoixacthuc || cookies.get("token")
  }))(WrappedComponent);
}
