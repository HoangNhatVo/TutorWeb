import React, { Component } from "react";
import { LayoutUser } from "../layouts";
import { Typography, Paper, Grid, Button, Chip } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { color, getRole, getSpecialize } from "../utils";
import { withRouter } from "react-router-dom";
import { Avatar } from "../components";
import moment from "moment";
import { connect } from "react-redux";
import { getSpecializes, getUser } from "../actions";

function ItemInfo({ title, value }) {
  return (
    <>
      <Grid item style={{ alignSelf: "center" }} xs={2}>
        <Typography style={{ fontWeight: 400, color: "black" }} variant="body1">
          {title}
        </Typography>
      </Grid>
      <Grid item style={{ alignSelf: "center" }} xs={10}>
        <Typography variant="body1" color="textSecondary">
          {value}
        </Typography>
      </Grid>
    </>
  );
}

class UserProfileShow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const { currentUser } = this.props;

    if (!this.props.gotSpecializes) this.props.getSpecializes();
    if (!currentUser.id || currentUser.id !== id) this.props.getUser(id);
  }

  render() {
    const { currentUser, specializes } = this.props;

    if (!currentUser) return <div />;
    const {
      diachi,
      thanhpho,
      baigioithieu,
      avatar,
      hoten,
      vaitro,
      email,
      ngaysinh,
      gioitinh,
      sdt,
      tiendaymotgio,
      monhoc,
      chuyennganh
    } = currentUser;

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
              <Avatar
                src={avatar}
                alt="Ảnh đại diện"
                style={{ width: 80, height: 80 }}
                className="mt1"
              />
              <Typography
                variant="h5"
                className="mt1"
                component="p"
                style={{ fontWeight: 600 }}
                align="center"
              >
                {hoten}
              </Typography>

              <Typography
                variant="body1"
                className="mb1"
                component="p"
                color="textSecondary"
                align="center"
              >
                {getRole(vaitro)}
              </Typography>

              <div
                className="df mt1 jcsb ac"
                style={{ padding: "0 2rem", width: "100%" }}
              >
                <div className="df fdc">
                  <Typography
                    variant="h3"
                    component="p"
                    style={{ fontWeight: 400, color: color.main }}
                  >
                    30
                  </Typography>
                  <Typography variant="body2" component="p">
                    giờ dạy
                  </Typography>
                </div>
                <div className="df fdc">
                  <Typography
                    variant="h3"
                    component="p"
                    style={{ fontWeight: 400, color: color.main }}
                  >
                    4
                  </Typography>
                  <Typography variant="body2" component="p">
                    học sinh
                  </Typography>
                </div>
                <div className="df fdc">
                  <Typography
                    variant="h3"
                    component="p"
                    style={{ fontWeight: 400, color: color.main }}
                  >
                    47
                  </Typography>
                  <Typography variant="body2" component="p">
                    đánh giá
                  </Typography>
                </div>
              </div>
            </Paper>
            <Button
              variant="contained"
              color="primary"
              className="mt1 p1"
              fullWidth
              // disabled={isSigningUp}
            >
              Đặt lịch
            </Button>
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
                Một chút về bản thân
              </Typography>
              <Typography color="textSecondary" component="p" variant="body1">
                {baigioithieu || "Chưa cập nhật bài giới thiệu..."}
              </Typography>
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
              <Grid container spacing={2}>
                <ItemInfo title="Giới tính" value={gioitinh} />
                <ItemInfo
                  title="Ngày sinh"
                  value={moment(ngaysinh).format("DD/MM/YYYY")}
                />

                <ItemInfo title="Địa chỉ" value={`${diachi} - ${thanhpho}`} />
                <ItemInfo title="Email" value={email} />
                <ItemInfo title="Điện thoại" value={sdt} />
                <ItemInfo
                  title="Chuyên ngành"
                  value={getSpecialize(specializes, chuyennganh)}
                />
                <ItemInfo
                  title="Tiền dạy một giờ"
                  value={`${tiendaymotgio}VND/h`}
                />
                <ItemInfo title="Môn học" value={monhoc} />

                <Grid item style={{ alignSelf: "center" }} xs={2}>
                  <Typography
                    style={{ fontWeight: 400, color: "black" }}
                    variant="body1"
                  >
                    Kỹ năng
                  </Typography>
                </Grid>
                <Grid item style={{ alignSelf: "center" }} xs={10}>
                  <div className="df">
                    {["Tin hoc", "photoshop"].map(tag => (
                      <Chip className="mr1" key={tag} label={tag} />
                    ))}
                  </div>
                </Grid>
              </Grid>
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
                Lịch sử dạy học
              </Typography>

              {[1, 2, 3, 4, 5].map(list => (
                <div className="df mb1" key={list}>
                  <Avatar src={null} name="Hao" alt="" />
                  <div className="f1 ml1">
                    <Typography
                      style={{ fontWeight: 400, color: "black" }}
                      variant="body1"
                      gutterBottom
                    >
                      Hoàng An Văn
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      Nhận xét: Rất tốt
                    </Typography>
                  </div>
                  <Rating name="read-only" value={3} readOnly />
                </div>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </LayoutUser>
    );
  }
}

export default withRouter(
  connect(
    ({ utils, admin }) => ({
      specializes: utils.specializes && utils.specializes.specializes,
      gotSpecializes: utils.specializes && utils.specializes.isOk,
      currentUser: admin.currentUser && admin.currentUser.userData
    }),
    { getSpecializes, getUser }
  )(UserProfileShow)
);
