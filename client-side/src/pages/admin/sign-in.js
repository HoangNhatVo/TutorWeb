import React, { Component } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";

class AdminSignIn extends Component {
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
      <Container maxWidth="sm" className="df fc f1">
        <header className="df mt2">
          <img src="/logo.svg" style={{ width: 120, height: 120 }} alt="logo" />
          <Typography
            component="h1"
            variant="h5"
            style={{ alignSelf: "flex-end" }}
          >
            Trang đăng nhập quản trị viên
          </Typography>
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
    );
  }
}

export default AdminSignIn;
