import React, { Component } from "react";
import { LayoutUser } from "../layouts";
import Avatar from "react-avatar-edit";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem
} from "@material-ui/core";
import "./style/teacher-home.css";
import { connect } from "react-redux";
import { getProfile, updateDescription, updateBasicInfo } from "../actions";

const avatarDefault =
  "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-1/p100x100/67735731_499113454230617_7180310859275567104_n.jpg?_nc_cat=106&_nc_ohc=wfZV2GtbX2AAQm8sVDklsINg5iUsow-WVWd6c0Gpi1Xpr0n149MUjItfA&_nc_ht=scontent.fsgn1-1.fna&oh=5c9b9f5223c8b7808fc4bc4afe1e7004&oe=5E8832C5";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

class UserProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: null,
      src: "",
      isChangeAvatar: false,

      fullname: (this.props.userData && this.props.userData.hoten) || "",
      address: (this.props.userData && this.props.userData.diachi) || "",
      tags: [],
      description:
        (this.props.userData && this.props.userData.baigioithieu) || ""
    };
  }

  componentWillReceiveProps(newProps) {
    const { userData } = newProps;

    if (userData.chuoixacthuc) {
      this.setState({
        fullname: userData.hoten,
        address: userData.diachi,
        description: userData.baigioithieu
      });
    }
  }

  onCrop = preview => {
    this.setState({ preview });
  };

  onClose = () => {
    this.setState({ preview: null });
  };

  changeState = field => event => {
    this.setState({ [field]: event.target.value });
  };

  render() {
    const { isChangeAvatar, description, fullname, tags, address } = this.state;
    const { userData, updateDescription, updateBasicInfo } = this.props;

    return (
      <LayoutUser>
        <Grid container spacing={2} className="mt2">
          <Grid item xs={4}>
            <Paper
              className="df fdc ac"
              style={{
                borderRadius: 4,
                overflow: "hidden",
                padding: "1rem"
              }}
              elevation={2}
            >
              {isChangeAvatar && (
                <Avatar
                  width={200}
                  height={200}
                  onCrop={this.onCrop}
                  onClose={this.onClose}
                  src={this.state.src}
                />
              )}
              <img
                src={this.state.preview || avatarDefault}
                alt="Avatar"
                className="mt1"
                style={{
                  border: "1px solid gray",
                  borderRadius: "50%",
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  cursor: "pointer"
                }}
                onClick={() =>
                  this.setState(prevState => ({
                    isChangeAvatar: !prevState.isChangeAvatar
                  }))
                }
              />
              <Typography
                variant="h5"
                className="mt1"
                component="p"
                style={{ fontWeight: 600 }}
                align="center"
              >
                Lê Văn Tư
              </Typography>

              <Typography
                variant="body1"
                className="mb1"
                component="p"
                color="textSecondary"
                align="center"
              >
                Giáo viên
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper
              style={{
                borderRadius: 4,
                padding: "1rem"
              }}
              elevation={2}
            >
              <Typography
                style={{ fontWeight: 600, color: "gray" }}
                variant="body2"
                className="mb1"
              >
                Cá nhân
              </Typography>
              <TextField
                fullWidth
                label="Giới thiệu bản thân"
                variant="outlined"
                multiline
                rows={4}
                rowsMax={4}
                value={description}
                onChange={this.changeState("description")}
              />
              <Button
                variant="contained"
                color="primary"
                className="mt1"
                size="small"
                onClick={() => updateDescription(description)}
                disabled={userData && userData.updatingDescription}
              >
                Cập nhật
              </Button>
            </Paper>

            <Paper
              style={{
                borderRadius: 4,
                padding: "1rem"
              }}
              className="mt1"
              elevation={2}
            >
              <Typography
                style={{ fontWeight: 600, color: "gray" }}
                variant="body2"
                className="mb1"
              >
                Thông tin cơ bản
              </Typography>
              <TextField
                fullWidth
                label="Họ tên"
                variant="outlined"
                value={fullname}
                onChange={this.changeState("fullname")}
              />
              <TextField
                fullWidth
                label="Địa chỉ"
                variant="outlined"
                className="mt1"
                value={address}
                onChange={this.changeState("address")}
              />
              <Button
                variant="contained"
                color="primary"
                className="mt1"
                size="small"
                disabled={userData && userData.updatingBasicInfo}
                onClick={() => updateBasicInfo(fullname, address)}
              >
                Cập nhật
              </Button>
            </Paper>

            <Paper
              style={{
                borderRadius: 4,
                padding: "1rem"
              }}
              className="mt1 mb1"
              elevation={2}
            >
              <Typography
                style={{ fontWeight: 600, color: "gray" }}
                variant="body2"
                className="mb1"
              >
                Tag kỹ năng
              </Typography>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-mutiple-chip-label">
                  Tags của bạn
                </InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={tags}
                  onChange={event => {
                    this.setState({ tags: event.target.value });
                  }}
                  input={
                    <OutlinedInput labelWidth={90} id="select-multiple-chip" />
                  }
                  renderValue={selected => (
                    <div>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                className="mt1"
                size="small"

                // disabled={isSigningUp}
              >
                Cập nhật
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </LayoutUser>
    );
  }
}

export default connect(
  ({ auth }) => ({
    userData: auth.userData
  }),
  { getProfile, updateDescription, updateBasicInfo }
)(UserProfileEdit);
