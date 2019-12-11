import React, { Component } from "react";
import { LayoutUser } from "../layouts";
import { Typography, Paper, Grid, Button, Chip } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { color } from "../utils";
import { Avatar } from "../components";

const avatarDefault =
  "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-1/p100x100/67735731_499113454230617_7180310859275567104_n.jpg?_nc_cat=106&_nc_ohc=wfZV2GtbX2AAQm8sVDklsINg5iUsow-WVWd6c0Gpi1Xpr0n149MUjItfA&_nc_ht=scontent.fsgn1-1.fna&oh=5c9b9f5223c8b7808fc4bc4afe1e7004&oe=5E8832C5";

class UserProfileShow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
                Copywriter and professional translator (English to Arabic and
                vice versa). Over the last fours years, I have provided great
                content and translations for a large number of websites and
                publishing houses. Copywriter and professional translator
                (English to Arabic and vice versa). Over the last fours years, I
                have provided great content and translations for a large number
                of websites and publishing houses.
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
                <Grid item style={{ alignSelf: "center" }} xs={2}>
                  <Typography
                    style={{ fontWeight: 400, color: "black" }}
                    variant="body1"
                  >
                    Địa chỉ
                  </Typography>
                </Grid>
                <Grid item style={{ alignSelf: "center" }} xs={10}>
                  <Typography variant="body1" color="textSecondary">
                    123 Hồ Chí Minh xyz
                  </Typography>
                </Grid>

                <Grid item style={{ alignSelf: "center" }} xs={2}>
                  <Typography
                    style={{ fontWeight: 400, color: "black" }}
                    variant="body1"
                  >
                    Email
                  </Typography>
                </Grid>
                <Grid item style={{ alignSelf: "center" }} xs={10}>
                  <Typography variant="body1" color="textSecondary">
                    hoaloan@gmail.com
                  </Typography>
                </Grid>

                <Grid item style={{ alignSelf: "center" }} xs={2}>
                  <Typography
                    style={{ fontWeight: 400, color: "black" }}
                    variant="body1"
                  >
                    Điện thoại
                  </Typography>
                </Grid>
                <Grid item style={{ alignSelf: "center" }} xs={10}>
                  <Typography variant="body1" color="textSecondary">
                    099329219
                  </Typography>
                </Grid>

                <Grid item style={{ alignSelf: "center" }} xs={2}>
                  <Typography
                    style={{ fontWeight: 400, color: "black" }}
                    variant="body1"
                  >
                    Chuyên ngành
                  </Typography>
                </Grid>
                <Grid item style={{ alignSelf: "center" }} xs={10}>
                  <Typography variant="body1" color="textSecondary">
                    Công nghệ thông tin
                  </Typography>
                </Grid>

                <Grid item style={{ alignSelf: "center" }} xs={2}>
                  <Typography
                    style={{ fontWeight: 400, color: "black" }}
                    variant="body1"
                  >
                    Môn học
                  </Typography>
                </Grid>
                <Grid item style={{ alignSelf: "center" }} xs={10}>
                  <Typography variant="body1" color="textSecondary">
                    Toán, lý, hóa
                  </Typography>
                </Grid>

                <Grid item style={{ alignSelf: "center" }} xs={2}>
                  <Typography
                    style={{ fontWeight: 400, color: "black" }}
                    variant="body1"
                  >
                    Kỹ năng
                  </Typography>
                </Grid>
                <Grid item style={{ alignSelf: "center" }} xs={10}>
                  <Typography variant="body1" color="textSecondary">
                    {["Tin hoc", "photoshop"].map(tag => (
                      <Chip className="mr1" key={tag} label={tag} />
                    ))}
                  </Typography>
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
                <div className="df mb1">
                  <Avatar src="" alt="" />
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
export default UserProfileShow;
