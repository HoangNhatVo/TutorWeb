import React, { Component } from "react";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signIn } from "../../actions";

class AdminSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      username: "",
      password: "",
      isCheckOn: false
    };
  }

  changeState = field => event => {
    this.setState({ [field]: event.target.value });
  };

  render() {
    const { username, password, isCheckOn } = this.state;
    const { message } = this.props;

    return (
      <Container maxWidth="sm" className="df fdc f1">
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
            autoFocus
            required
            helperText={isCheckOn && !username && "Không được để trống"}
            error={isCheckOn && !username}
            value={username}
            onChange={this.changeState("username")}
            className="mt1"
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            variant="outlined"
            value={password}
            helperText={isCheckOn && !password && "Không được để trống"}
            error={isCheckOn && !password}
            required
            type="password"
            onChange={this.changeState("password")}
            className="mt1"
          />
          <Link
            to="/reset-password"
            className="mt1"
            style={{ display: "inline-block", color: "blue" }}
          >
            Quên mật khẩu?
          </Link>
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
            disabled={this.props.isSigningIn}
            style={{ marginBottom: "2rem", padding: "1rem 0" }}
            fullWidth
            onClick={e => {
              e.preventDefault();
              this.setState({ isCheckOn: true });
              if (!username || !password) return;
              this.props.signIn(username, password);
            }}
          >
            Đăng nhập
          </Button>
        </form>
      </Container>
    );
  }
}

export default connect(
  ({ auth }) => ({
    isSigningIn: auth.signIn.isSigningIn,
    message: auth.signIn.message
  }),
  { signIn }
)(AdminSignIn);
