import React from "react";
import { Container, Link } from "@material-ui/core";
import { color } from "../utils";

class Menu extends React.Component {
  preventDefault = e => e.preventDefault();

  render() {
    return (
      <div style={{ background: color.menu, padding: "1rem 56px" }}>
        <Container
          maxWidth="lg"
          className="df jcsb"
          style={{ padding: "0 4rem" }}
        >
          <Link href="#" onClick={this.preventDefault}>
            Web
          </Link>
          <Link href="#" onClick={this.preventDefault}>
            We nâng cao
          </Link>
          <Link href="#" onClick={this.preventDefault}>
            Mobile
          </Link>
          <Link href="#" onClick={this.preventDefault}>
            TKGD
          </Link>
          <Link href="#" onClick={this.preventDefault}>
            KTLT
          </Link>
          <Link href="#" onClick={this.preventDefault}>
            Desgin
          </Link>
          <Link href="#" onClick={this.preventDefault}>
            PTTK
          </Link>
        </Container>
      </div>
    );
  }
}
export default Menu;
