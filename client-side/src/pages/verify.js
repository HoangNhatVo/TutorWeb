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
      success: null,
      message: ""
    };
  }
  async componentDidMount() {
    this.setState({ isVerifying: true });
    const response = await api.post("/verify", {
      verify: window.location.pathname.slice("/verify".length + 1)
    });

    if (response && response.data === "Thành công") {
      this.setState({
        isVerifying: false,
        success: true,
        message: response.data
      });

      history.push("/sign-in");
    } else
      this.setState({
        isVerifying: false,
        success: false,
        message: response.data
      });
  }

  render() {
    const { isVerifying, message } = this.state;

    return (
      <div className="df fdc p1" style={{ minHeight: "100vh" }}>
        {message && (
          <Typography variant="body2" color="secondary">
            {message}
          </Typography>
        )}
        {isVerifying && (
          <Typography variant="body1"> Đang xác thực...</Typography>
        )}
      </div>
    );
  }
}

export default withRouter(Verify);
