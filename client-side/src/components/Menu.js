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
            Sản phẩm
          </Link>
          <Link href="#" onClick={this.preventDefault}>
            Dịch vụ
          </Link>
          <Link href="#" onClick={this.preventDefault}>
            Cách thức kết nối
          </Link>
          <Link href="#" onClick={this.preventDefault}>
            Liên hệ trợ giúp
          </Link>
          <Link href="#" onClick={this.preventDefault}>
            Cộng đồng
          </Link>
          <Link href="#" onClick={this.preventDefault}>
            Báo cáo
          </Link>
        </Container>
      </div>
    );
  }
}
export default Menu;
