import React from "react";
import Button from "@material-ui/core/Button";
import "./style/banner.css";
import { Typography } from "@material-ui/core";

class Banner extends React.Component {
  render() {
    return (
      <div className="banner">
        <img
          style={{ width: "100%", height: 500 }}
          src="https://www.asktutorhelp.com/img/banner_1.jpg"
          alt="banner"
        />
        <div className="title">
          <Typography variant="h1" component="h1" className="titleBanner">
            X-Tutor
          </Typography>
          <Typography
            variant="h5"
            component="h5"
            gutterBottom
            className="contentbanner"
          >
            Nơi kết nối học sinh, gia sư nhanh nhất! Mang đến cho bạn trải
            nghiệm lớp học tuyệt vời.
          </Typography>
          <Button
            variant="contained"
            className="mt1"
            style={{ padding: "1rem 2rem" }}
            color="primary"
          >
            Tìm hiểu thêm
          </Button>
        </div>
      </div>
    );
  }
}
export default Banner;
