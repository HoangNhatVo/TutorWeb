import React, { Component } from "react";
import { HeaderIn, Footer } from "../components";
import { Container } from "@material-ui/core";

class LayoutUser extends Component {
  render() {
    return (
      <div className="df fdc" style={{ minHeight: "100vh" }}>
        <HeaderIn />
        <Container maxWidth="lg" className="df fdc f1">
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }
}
export default LayoutUser;
