import React, { Component } from "react";
import { LayoutUser } from "../layouts";
import MyAvatar from "react-avatar-edit";
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
  MenuItem,
  Avatar
} from "@material-ui/core";
import "./style/teacher-home.css";
import { connect } from "react-redux";
import { updateDescription, updateBasicInfo, updateAvatar } from "../actions";
import { getRole } from "../utils";

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

const getTagName = (tags, id) => {
  let ret = "";
  tags.forEach(item => {
    if (id === item.id) ret = item.tentag;
  });

  return ret;
};

class UserProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: null,
      src: "",
      isChangeAvatar: false,

      fullname: (this.props.userData && this.props.userData.hoten) || "",
      address: (this.props.userData && this.props.userData.diachi) || "",
      userTags: [],
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
    const {
      isChangeAvatar,
      description,
      fullname,
      userTags,
      address,
      preview
    } = this.state;

    const {
      userData,
      updateDescription,
      updateBasicInfo,
      updateAvatar,
      tags
    } = this.props;

    if (!userData) return <div />;

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
                <div className="df fdc ac">
                  <MyAvatar
                    width={200}
                    height={200}
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                    src={this.state.src}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className="mt1"
                    size="small"
                    disabled={userData.updatingAvatar}
                    onClick={() => {
                      if (preview) updateAvatar(preview);
                    }}
                  >
                    Cập nhật
                  </Button>
                </div>
              )}
              <Avatar
                src={preview || userData.avatar}
                alt="Ảnh đại diện"
                style={{ width: 80, height: 80 }}
                className="mt1"
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
                {userData.hoten}
              </Typography>

              <Typography
                variant="body1"
                className="mb1"
                component="p"
                color="textSecondary"
                align="center"
              >
                {getRole(userData.vaitro)}
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
                  value={userTags}
                  onChange={event => {
                    this.setState({ userTags: event.target.value });
                  }}
                  input={
                    <OutlinedInput labelWidth={90} id="select-multiple-chip" />
                  }
                  renderValue={selected => (
                    <div>
                      {selected.map(tag => (
                        <Chip key={tag} label={getTagName(tags, tag)} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {tags.map(tag => (
                    <MenuItem key={tag.id} value={tag.id}>
                      {tag.tentag}
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
  ({ auth, utils }) => ({
    userData: auth.userData,
    tags: utils.tags && utils.tags.tags
  }),
  { updateDescription, updateBasicInfo, updateAvatar }
)(UserProfileEdit);
