import React, { Component } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { HeaderOut, Footer } from "../components";
// import api from "../utils/axios";
import { connect } from "react-redux";
import { signIn } from "../actions";

class UserSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  changeState = field => event => {
    this.setState({ [field]: event.target.value });
  };

  // googleSignIn = async () => {
  //   const response = await api.get("/google");
  //   console.log(response);
  // };

  render() {
    const { username, password } = this.state;
    const { signIn, isSigningIn, message } = this.props;

    return (
      <div className="df fc" style={{ minHeight: "100vh" }}>
        <HeaderOut hasNoAccount />
        <Container maxWidth="sm" className="df fc f1">
          <header className="df mt2">
            <img
              src="/logo.svg"
              style={{ width: 160, height: 160 }}
              alt="logo"
            />
            <div style={{ alignSelf: "flex-end" }}>
              <Typography component="h1" variant="h4">
                X-Tutor
              </Typography>
              <Typography
                component="p"
                variant="body1"
                color="textSecondary"
                className="mt1"
              >
                Nơi kết nối học sinh, gia sư nhanh nhất!
              </Typography>
            </div>
          </header>
          <form>
            <TextField
              fullWidth
              label="Tài khoản"
              variant="outlined"
              autoFocus
              required
              value={username}
              onChange={this.changeState("username")}
              className="mt1"
            />
            <TextField
              fullWidth
              label="Mật khẩu"
              variant="outlined"
              value={password}
              required
              type="password"
              onChange={this.changeState("password")}
              className="mt1"
            />

            {message && (
              <Typography
                variant="body2"
                color="secondary"
                className="mt1"
                align="center"
              >
                {message}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="mt1"
              disabled={isSigningIn}
              style={{ marginBottom: "2rem", padding: "1rem 0" }}
              fullWidth
              onClick={e => {
                e.preventDefault();
                if (!username || !password) return;
                signIn(username, password);
              }}
            >
              Đăng nhập
            </Button>
          </form>
          <Typography component="p" variant="body2" align="center">
            Hoặc
          </Typography>

          <div className="df jcsb mb1">
            <Button
              variant="contained"
              className="mt1"
              disabled={this.props.isSigningIn}
              style={{
                background: "red",
                color: "white",
                padding: "1rem 0",
                width: "48%"
              }}
              fullWidth
              onClick={this.googleSignIn}
            >
              Đăng nhập với google
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="mt1"
              disabled={this.props.isSigningIn}
              style={{ background: "blue", padding: "1rem 0", width: "48%" }}
              fullWidth
            >
              Đăng nhập với facebook
            </Button>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default connect(
  ({ auth }) => ({
    isSigningIn: auth.signIn.isSigningIn,
    message: auth.signIn.message
  }),
  { signIn }
)(UserSignIn);
