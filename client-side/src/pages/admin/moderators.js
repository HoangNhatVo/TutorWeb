import React, { Component } from "react";
import { LayoutAdmin } from "../../layouts";
import MaterialTable from "material-table";
import { signUpAdmin, getAllAdmins } from "../../actions";
import { connect } from "react-redux";
import {
  Dialog,
  DialogContent,
  TextField,
  Typography,
  MenuItem,
  Button
} from "@material-ui/core";
import moment from "moment";

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

class TableAccount extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      { title: "Họ tên", field: "hoten" },
      {
        title: "Email",
        field: "email"
      },
      { title: "Số điện thoại", field: "sdt" },
      {
        title: "Username",
        field: "username"
      }
    ];
  }

  render() {
    return (
      <MaterialTable
        title="Danh sách tài khoản quản trị"
        columns={this.columns}
        data={this.props.data}
        actions={[
          {
            icon: "add",
            tooltip: "Thêm 1 admin",
            isFreeAction: true,
            onClick: this.props.wannaAddAdmin
          }
        ]}
      />
    );
  }
}

const initState = {
  username: "",
  password: "",
  fullname: "",
  email: "",
  dob: moment().format("YYYY-MM-DD"),
  gender: "",
  address: "",
  city: "",
  phone: ""
};

class Moderators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      ...initState
    };
  }

  componentDidMount() {
    const { admins } = this.props;
    if (admins && !admins.isOk) this.props.getAllAdmins();
  }

  changeState = field => event => {
    this.setState({ [field]: event.target.value });
  };

  render() {
    const { admins, signUpAdmin, message } = this.props;
    const {
      openDialog,
      username,
      password,
      fullname,
      email,
      dob,
      gender,
      address,
      city,
      phone
    } = this.state;

    return (
      <LayoutAdmin>
        <TableAccount
          data={admins.admins}
          wannaAddAdmin={() => this.setState({ openDialog: true })}
        />

        <Dialog
          fullWidth
          maxWidth="sm"
          open={openDialog}
          onClose={() => this.setState({ openDialog: false })}
        >
          <DialogContent>
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
              <div className="df jcsb">
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

              {message && (
                <Typography
                  variant="body2"
                  style={{ color: message === "Thành công" ? "green" : "red" }}
                  className="mt1"
                  align="center"
                >
                  {message}
                </Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                className="mt1"
                style={{ marginBottom: "2rem", padding: "1rem 0" }}
                fullWidth
                disabled={this.props.isSigningUp}
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

                  signUpAdmin(
                    username,
                    password,
                    fullname,
                    email,
                    moment(dob).format("DD/MM/YYYY"),
                    gender,
                    address,
                    city,
                    phone,
                    {
                      suc: () => {
                        this.setState(prevState => ({
                          ...prevState,
                          ...initState
                        }));
                      }
                    }
                  );
                }}
              >
                Đăng ký
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </LayoutAdmin>
    );
  }
}

export default connect(
  ({ auth, admin }) => ({
    isSigningUp: auth.signUp.isSigningUp,
    message: auth.signUp.message,
    admins: admin.admins
  }),
  { signUpAdmin, getAllAdmins }
)(Moderators);
