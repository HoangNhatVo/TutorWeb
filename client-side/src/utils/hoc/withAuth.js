import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import cookies from "../cookies";
import { getProfile, getTags } from "../../actions";

export function withAuth(ComposedComponent) {
  class WrappedComponent extends React.Component {
    componentDidMount() {
      if (this.props.shouldGet) this.props.getProfile();
      if (!this.props.isTagsGotten) this.props.getTags();
    }

    render() {
      const { isSignedIn } = this.props;

      if (!isSignedIn) return <Redirect to="/sign-in" />;
      else return <ComposedComponent {...this.props} />;
    }
  }

  return connect(
    ({ auth, admin }) => ({
      isSignedIn: auth.userData.chuoixacthuc || cookies.get("token"),
      shouldGet: !auth.userData.isOk,
      isTagsGotten: admin.tags.isOk
    }),
    { getProfile, getTags }
  )(WrappedComponent);
}
