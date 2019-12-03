import React, { Component } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { HeaderOut, Footer } from "../components";

class UserSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      username: "",
      password: ""
    };
  }

  changeState = field => event => {
    this.setState({ [field]: event.target.value });
  };
  render() {
    const { username, password } = this.state;

    return (
      <div className="df fc" style={{ minHeight: "100vh" }}>
        <HeaderOut />
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

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="mt1"
              style={{ marginBottom: "2rem", padding: "1rem 0" }}
              fullWidth
            >
              Đăng nhập
            </Button>
          </form>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default UserSignUp;
