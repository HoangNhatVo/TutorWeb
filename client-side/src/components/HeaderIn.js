import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Avatar,
  MenuItem,
  Menu,
  ListItemIcon,
} from "@material-ui/core";
import { connect } from "react-redux";
import { signOut } from "../actions";
import { AccountCircle, Person, CallMissedOutgoing } from "@material-ui/icons";

class HeaderIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleCloseMenu = () => this.setState({ anchorEl: null });

  render() {
    const { signOut, userData, ...res } = this.props;
    const { avatar, hoten: fullname } = userData;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="sticky" {...res}>
        <Container maxWidth="lg">
          <Toolbar variant="dense">
            <img src="/logo.svg" style={{ width: 32, height: 32 }} alt="logo" />
            <Typography variant="h6" className="f1">
              XTutor
            </Typography>

            <div
              className="df ac"
              onClick={event => this.setState({ anchorEl: event.target })}
            >
              <Typography className="mr1">{fullname}</Typography>
              {avatar ? (
                <Avatar src={avatar} alt="Ảnh đại diện" />
              ) : (
                <AccountCircle />
              )}
            </div>
          </Toolbar>
        </Container>

        <Menu
          transformOrigin={{ vertical: "bottom", horizontal: "right" }}
          anchorEl={anchorEl}
          open={Boolean(open)}
          onClose={this.handleCloseMenu}
        >
          <MenuItem onClick={this.handleCloseMenu}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Thông tin cá nhân</Typography>
          </MenuItem>
          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <CallMissedOutgoing fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit"> Đăng xuất</Typography>
          </MenuItem>
        </Menu>
      </AppBar>
    );
  }
}

export default connect(
  ({ auth }) => ({
    userData: auth.userData
  }),
  { signOut }
)(HeaderIn);
