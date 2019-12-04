import React, { Component } from "react";
import {
  Container,
  Typography,
  Chip,
  TextField,
  Divider,
  Button,
  InputAdornment,
  MenuItem
} from "@material-ui/core";
import { Face, Work } from "@material-ui/icons";
import { styled } from "@material-ui/core/styles";
import moment from "moment";
import { HeaderOut, Footer } from "../components";
import { connect } from "react-redux";
import { getSpecializes, signUpStudent, signUpTeacher } from "../actions";

const MyChip = styled(Chip)({
  padding: "3rem",
  margin: "1rem"
});

const genders = [
  {
    value: "Nam",
    label: "Nam"
  },
  {
    value: "Nữ",
    label: "Nữ"
  }
];

class UserSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      username: "",
      password: "",
      fullname: "",
      email: "",
      phone: "",
      gender: "",
      dob: moment().format("YYYY-MM-DD"),
      address: "",
      city: "",
      subject: "",
      description: "",
      specialization: 1,
      wage: 0
    };
  }

  componentDidMount() {
    if (!this.props.wasSpecializesCalled) this.props.getSpecializes();
  }

  changeState = field => event => {
    this.setState({ [field]: event.target.value });
  };
  changeStateDirect = (field, value) => {
    this.setState({ [field]: value });
  };

  render() {
    const {
      role,
      username,
      password,
      email,
      fullname,
      phone,
      dob,
      gender,
      address,
      city,
      subject,
      description,
      specialization,
      wage
    } = this.state;

    const {
      signUpStudent,
      signUpTeacher,
      isSigningUp,
      specializes
    } = this.props;

    return (
      <div className="df fc" style={{ minHeight: "100vh" }}>
        <HeaderOut hasAccount />
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

          <Typography component="p" className="mt2">
            Bạn là
          </Typography>
          <div className="df" style={{ justifyContent: "space-around" }}>
            <MyChip
              icon={<Face />}
              label="Học sinh"
              clickable={role !== "hs"}
              onClick={() => this.changeStateDirect("role", "hs")}
              color="primary"
              variant={role === "hs" ? "default" : "outlined"}
            />
            <MyChip
              icon={<Work />}
              label="Giáo viên"
              onClick={() => this.changeStateDirect("role", "gv")}
              clickable={role !== "gv"}
              color="primary"
              variant={role === "gv" ? "default" : "outlined"}
            />
          </div>

          {!role && (
            <Typography component="p" className="mt2">
              Chọn 1 vai trò...
            </Typography>
          )}

          {role === "hs" && (
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
              <Divider className="mt2" />
              <Typography component="p" className="mt2">
                Thông tin của bạn
              </Typography>
              <TextField
                fullWidth
                label="Họ tên"
                variant="outlined"
                value={fullname}
                onChange={this.changeState("fullname")}
                className="mt1"
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                type="email"
                onChange={this.changeState("email")}
                className="mt1"
              />
              <div className="df jsb">
                <TextField
                  label="Ngày sinh"
                  variant="outlined"
                  value={dob}
                  style={{ width: "48%" }}
                  type="date"
                  onChange={this.changeState("dob")}
                  className="mt1"
                />
                <TextField
                  label="Giới tính"
                  variant="outlined"
                  value={gender}
                  select
                  style={{ width: "48%" }}
                  onChange={this.changeState("gender")}
                  className="mt1"
                >
                  {genders.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <TextField
                fullWidth
                label="Số điện thoại"
                variant="outlined"
                value={phone}
                type="phone"
                onChange={this.changeState("phone")}
                className="mt1"
              />
              <TextField
                fullWidth
                label="Địa chỉ"
                variant="outlined"
                value={address}
                onChange={this.changeState("address")}
                className="mt1"
              />
              <TextField
                fullWidth
                label="Thành phố"
                variant="outlined"
                value={city}
                onChange={this.changeState("city")}
                className="mt1"
              />
              <Button
                variant="contained"
                color="primary"
                className="mt1"
                style={{ marginBottom: "2rem", padding: "1rem 0" }}
                fullWidth
                disabled={isSigningUp}
                onClick={() => {
                  if (
                    !username ||
                    !password ||
                    !fullname ||
                    !email ||
                    !dob ||
                    !gender ||
                    !address ||
                    !city ||
                    !phone
                  )
                    return;

                  signUpStudent(
                    username,
                    password,
                    fullname,
                    email,
                    moment(dob).format("DD/MM/YYYY"),
                    gender,
                    address,
                    city,
                    phone
                  );
                }}
              >
                Đăng ký
              </Button>
            </form>
          )}

          {role === "gv" && (
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
              <Divider className="mt2" />
              <Typography component="p" className="mt2">
                Thông tin của bạn
              </Typography>
              <TextField
                fullWidth
                label="Họ tên"
                variant="outlined"
                value={fullname}
                onChange={this.changeState("fullname")}
                className="mt1"
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                type="email"
                onChange={this.changeState("email")}
                className="mt1"
              />
              <div className="df jsb">
                <TextField
                  label="Ngày sinh"
                  variant="outlined"
                  value={dob}
                  style={{ width: "48%" }}
                  type="date"
                  onChange={this.changeState("dob")}
                  className="mt1"
                />
                <TextField
                  label="Giới tính"
                  variant="outlined"
                  value={gender}
                  select
                  style={{ width: "48%" }}
                  onChange={this.changeState("gender")}
                  className="mt1"
                >
                  {genders.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <TextField
                fullWidth
                label="Số điện thoại"
                variant="outlined"
                value={phone}
                type="phone"
                onChange={this.changeState("phone")}
                className="mt1"
              />
              <TextField
                label="Địa chỉ"
                variant="outlined"
                value={address}
                fullWidth
                onChange={this.changeState("address")}
                className="mt1"
              />
              <TextField
                fullWidth
                label="Thành phố"
                variant="outlined"
                value={city}
                onChange={this.changeState("city")}
                className="mt1"
              />
              <TextField
                fullWidth
                label="Giới thiệu bản thân"
                variant="outlined"
                multiline
                rows={4}
                rowsMax={4}
                value={description}
                onChange={this.changeState("description")}
                className="mt1"
              />
              <Divider className="mt2" />
              <Typography component="p" className="mt2">
                Chuyên môn
              </Typography>
              <TextField
                label="Chuyên ngành"
                variant="outlined"
                value={specialization}
                select
                fullWidth
                onChange={this.changeState("specialization")}
                className="mt1"
              >
                {specializes &&
                  specializes.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.ten}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                fullWidth
                label="Môn học"
                variant="outlined"
                value={subject}
                onChange={this.changeState("subject")}
                className="mt1"
              />
              <TextField
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">VND</InputAdornment>
                  )
                }}
                label="Tiền dạy 1 giờ"
                variant="outlined"
                type="number"
                value={wage}
                onChange={this.changeState("wage")}
                className="mt1"
              />
              <Button
                variant="contained"
                color="primary"
                className="mt1"
                style={{ marginBottom: "2rem", padding: "1rem 0" }}
                fullWidth
                disabled={isSigningUp}
                onClick={() => {
                  if (
                    !username ||
                    !password ||
                    !fullname ||
                    !email ||
                    !dob ||
                    !gender ||
                    !address ||
                    !city ||
                    !phone ||
                    !description ||
                    !subject ||
                    specialization === 1 ||
                    !wage
                  )
                    return;

                  signUpTeacher(
                    username,
                    password,
                    fullname,
                    email,
                    moment(dob).format("DD/MM/YYYY"),
                    gender,
                    address,
                    city,
                    phone,
                    description,
                    subject,
                    specialization,
                    wage
                  );
                }}
              >
                Đăng ký
              </Button>
            </form>
          )}
        </Container>
        <Footer />
      </div>
    );
  }
}

export default connect(
  ({ utils, auth }) => ({
    specializes: utils.specializes && utils.specializes.specializes,
    wasSpecializesCalled: utils.specializes && utils.specializes.isOk,
    isSigningUp: auth.signUp.isSigningUp,
    message: auth.signUp.message
  }),
  { getSpecializes, signUpStudent, signUpTeacher }
)(UserSignUp);
