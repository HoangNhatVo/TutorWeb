import React, { Component } from "react";
import {
  Typography,
  Avatar,
  MenuItem,
  Menu,
  ListItemIcon
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut, getProfile } from "../actions";
import {
  AccountCircle,
  Person,
  CallMissedOutgoing,
  Home
} from "@material-ui/icons";
import history from "../utils/history";
import cookies from "../utils/cookies";

class HeaderUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  componentDidMount() {
    const { userData } = this.props;

    if (userData && !userData.isOk) {
      this.props.getProfile();
    }
  }

  handleCloseMenu = () => this.setState({ anchorEl: null });

  render() {
    const { signOut, userData } = this.props;
    const { avatar, hoten: fullname } = userData;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const role = Number(cookies.get("role"));
    const url = role === 1 ? "/student" : role === 2 ? "/teacher" : "/admin";

    return (
      <>
        <Link
          to={url}
          style={{
            textDecoration: "none",
            color: "white",
            marginRight: "2rem"
          }}
          className="df aic"
        >
          <Home fontSize="small" style={{ marginRight: 4 }} />
          <Typography variant="body1">Hợp đồng của bạn</Typography>
        </Link>
        <div
          className="df aic"
          style={{ cursor: "pointer" }}
          onClick={event => this.setState({ anchorEl: event.target })}
        >
          <Typography className="mr1">{fullname}</Typography>
          {avatar ? (
            <Avatar
              src={avatar}
              style={{ width: 32, height: 32, border: "2px solid white" }}
              alt="Ảnh đại diện"
            />
          ) : (
            <AccountCircle />
          )}
        </div>
        <Menu
          transformOrigin={{ vertical: "bottom", horizontal: "right" }}
          anchorEl={anchorEl}
          open={Boolean(open)}
          onClose={this.handleCloseMenu}
        >
          <MenuItem onClick={() => history.push("/profile")}>
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
      </>
    );
  }
}

export default connect(
  ({ auth }) => ({
    userData: auth.userData
  }),
  { signOut, getProfile }
)(HeaderUserProfile);
