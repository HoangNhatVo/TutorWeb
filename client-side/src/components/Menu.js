import React from "react";
import { Container, Link } from "@material-ui/core";
import { color } from "../utils";

class Menu extends React.Component {
  render() {
    return (
      <div style={{ background: color.menu, padding: "1rem 56px" }}>
        <Container maxWidth="lg" className="df jsb">
          <Link>Web</Link>
          <Link>We nâng cao</Link>
          <Link>Mobile</Link>
          <Link>TKGD</Link>
          <Link>KTLT</Link>
          <Link>Desgin</Link>
          <Link>PTTK</Link>
        </Container>
      </div>
    );
  }
}
export default Menu;
