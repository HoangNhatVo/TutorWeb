import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import HeaderUserProfile from "./HeaderUserProfile";

class HeaderIn extends Component {
  render() {
    return (
      <AppBar position="sticky" {...this.props}>
        <Container maxWidth="lg">
          <Toolbar variant="dense">
            <img src="/logo.svg" style={{ width: 32, height: 32 }} alt="logo" />
            <Typography variant="h6" className="f1">
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
