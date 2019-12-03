import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container
} from "@material-ui/core";

class HeaderOut extends Component {
  render() {
    const { hasAccount } = this.props;
    return (
      <AppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar variant="dense">
            <img src="/logo.svg" style={{ width: 32, height: 32 }} alt="logo" />

            <Typography variant="h6" className="f1">
              XTutor
            </Typography>
            <div className="df ac">
              <Typography variant="body2" className="f1">
                Đã có tài khoản?
              </Typography>
              {hasAccount ? (
                <Button color="inherit">Đăng nhập</Button>
              ) : (
                <Button color="inherit">Đăng ký</Button>
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
export default HeaderOut;
