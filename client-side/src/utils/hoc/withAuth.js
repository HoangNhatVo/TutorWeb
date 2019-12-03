import React from "react";
import { Redirect } from "react-router-dom";

export function withAuth(ComposedComponent) {
  class WrappedComponent extends React.Component {
    render() {
      if (false) return <Redirect to="/sign-in" />;
      else return <ComposedComponent {...this.props} />;
    }
  }

  return WrappedComponent;
}
