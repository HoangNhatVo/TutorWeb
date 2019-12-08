import React from "react";
import { Container, Link } from "@material-ui/core";
import { color } from "../utils";
class Menu extends React.Component {

  render() {
    return (
      <div style={{ background: color.menu, fontSize:14}}>
        <Container maxWidth="lg" className="df jsb p1 ac">
          <Link>
          Web
          </Link>
          <Link>
          We nâng cao
          </Link>
          <Link>
          Mobile
          </Link>
          <Link>
          TKGD
          </Link>
          <Link>
          KTLT
          </Link>
          <Link>
          Desgin
          </Link>
          <Link>
          PTTK
          </Link>
        </Container>
      </div>
    )
  }
}
export default Menu