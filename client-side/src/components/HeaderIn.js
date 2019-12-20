import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import HeaderUserProfile from "./HeaderUserProfile";
import history from "../utils/history";

class HeaderIn extends Component {
  toHome = () => {
    history.push("/");
  };

  render() {
    return (
      <AppBar position="sticky" {...this.props}>
        <Container maxWidth="lg">
          <Toolbar variant="dense">
            <img
              onClick={this.toHome}
              src="/logo.svg"
              style={{ width: 32, cursor: "pointer", height: 32 }}
              alt="logo"
            />
            <Typography
              onClick={this.toHome}
              style={{ cursor: "pointer" }}
              variant="h6"
              className="f1"
            >
              XTutor
            </Typography>
            <HeaderUserProfile />
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default HeaderIn;
