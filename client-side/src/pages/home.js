import React, { Component } from "react";
import { HeaderOut, Footer } from "../components";
import { Container, Typography } from "@material-ui/core";

class Home extends Component {
  render() {
    return (
      <div className="df fc" style={{ minHeight: "100vh" }}>
        <HeaderOut hasNoAccount hasAccount />
        <Container maxWidth="lg" className="df fc f1">
          <Typography
            variant="h4"
            className="mt2"
            align="center"
            component="h4"
          >
            Hello Home page
          </Typography>
        </Container>
        <Footer />
      </div>
    );
  }
}
export default Home;
