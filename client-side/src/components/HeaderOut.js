import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container
} from "@material-ui/core";
import history from "../utils/history";
import cookies from "../utils/cookies";
import HeaderUserProfile from "./HeaderUserProfile";
import { connect } from "react-redux";

class HeaderOut extends Component {
  render() {
    const { hasAccount, hasNoAccount, isSignedIn } = this.props;

    return (
      <AppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar variant="dense">
            <img src="/logo.svg" style={{ width: 32, height: 32 }} alt="logo" />

            <Typography variant="h6" className="f1">
              XTutor
            </Typography>
            {isSignedIn ? (
              <HeaderUserProfile />
            ) : (
              <div className="df ac">
                <Typography variant="body2" className="f1">
                  Đã có tài khoản?
                </Typography>
                {hasAccount && (
                  <Button
                    style={{ marginLeft: "1rem" }}
                    color="inherit"
                    onClick={() => history.push("/sign-in")}
                  >
                    Đăng nhập
                  </Button>
                )}

                {hasNoAccount && (
                  <Button
                    style={{ marginLeft: "1rem" }}
                    color="inherit"
                    onClick={() => history.push("/sign-up")}
                  >
                    Đăng ký
                  </Button>
                )}
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default connect(({ auth }) => ({
  isSignedIn: auth.userData.chuoixacthuc || cookies.get("token")
}))(HeaderOut);
