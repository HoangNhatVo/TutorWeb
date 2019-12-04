import React, { Component } from "react";
import { HeaderIn, Footer } from "../components";
import { Container } from "@material-ui/core";

class LayoutUser extends Component {
  render() {
    return (
      <div className="df fc" style={{ minHeight: "100vh" }}>
        <HeaderIn />
        <Container maxWidth="lg" className="df fc f1">
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }
}
export default LayoutUser;
