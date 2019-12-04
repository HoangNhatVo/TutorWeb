import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import history from "../utils/history";
import api from "../utils/axios";
import { withRouter } from "react-router-dom";

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerifying: false,
      success: null
    };
  }

  async componentDidMount() {
    this.setState({ isVerifying: true });

    const response = await api.post("/verify", {
      verify: this.props.match.params.id
    });

    if (response) {
      this.setState({ isVerifying: false, success: true });
    } else this.setState({ success: false });
  }

  render() {
    const { isVerifying, success } = this.state;

    if (!isVerifying && success)
      setTimeout(() => history.push("/student"), 500);
    if (!isVerifying && success === false)
      setTimeout(() => history.push("/login"), 500);

    return (
      <div className="df fc" style={{ minHeight: "100vh" }}>
        {isVerifying && (
          <Typography variant="body1"> Đang xác thực...</Typography>
        )}
      </div>
    );
  }
}

export default withRouter(Verify);
