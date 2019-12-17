import React, { Component } from "react";
import { Container, Link } from "@material-ui/core";
import { color } from "../utils";

class Footer extends Component {
  preventDefault = e => e.preventDefault();

  render() {
    return (
      <div style={{ background: color.main }}>
        <Container maxWidth="lg" className="df jcsb p1 ac">
          <Link
            style={{ color: "white" }}
            href="#"
            onClick={this.preventDefault}
          >
            Về chúng tôi
          </Link>
          <Link
            style={{ color: "white" }}
            href="#"
            onClick={this.preventDefault}
          >
            Liên hệ
          </Link>
          <img src="/logo.svg" style={{ width: 32, height: 32 }} alt="logo" />
          <Link
            style={{ color: "white" }}
            href="#"
            onClick={this.preventDefault}
          >
            Điều khoản
          </Link>
          <Link
            style={{ color: "white" }}
            href="#"
            onClick={this.preventDefault}
          >
            Chính sách
          </Link>
        </Container>
      </div>
    );
  }
}
export default Footer;
