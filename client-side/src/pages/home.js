import React, { useEffect } from "react";
import { HeaderOut, Footer, Menu, Banner, TeacherCard } from "../components";
import { Container, Typography, Link } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getTeachers } from "../actions";
import { connect } from "react-redux";
import { color } from "../utils";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function ItemHot({ src, body1, body2 }) {
  return (
    <Grid item xs={3}>
      <div className="df fdc aic">
        <img
          src={src}
          alt=""
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            backgroundColor: "transparent"
          }}
        />
        <Typography
          variant="body1"
          gutterBottom
          color="textPrimary"
          className="mt1"
        >
          {body1}
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary">
          {body2}
        </Typography>
      </div>
    </Grid>
  );
}

function Home({ teachers, getTeachers }) {
  const classes = useStyles();

  useEffect(() => {
    getTeachers();
  }, []);

  const { isLoading } = teachers;

  return (
    <div className="df fdc" style={{ minHeight: "100vh" }}>
      <HeaderOut hasNoAccount hasAccount />
      <Menu />
      <Banner />

      <Container maxWidth="lg" className="df fdc f1">
        <Typography
          variant="h5"
          className="mt2 mb2"
          align="center"
          component="h5"
          style={{ fontWeight: 600 }}
        >
          Gia sư đáng tin cậy
        </Typography>

        {isLoading ? (
          <div>Đang tải...</div>
        ) : (
          <Grid container justify="center" spacing={2}>
            {teachers.teachers.slice(0, 10).map((teacher, index) => (
              <Grid key={index} item xs={3}>
                <TeacherCard data={teacher} className={classes.paper} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <div
        style={{
          backgroundColor: color.main,
          textAlign: "center"
        }}
        className="df fdc aic p1 mt2"
      >
        <Typography
          variant="h5"
          className="mt2"
          align="center"
          component="h5"
          gutterBottom
          style={{ fontWeight: 600, color: "white" }}
        >
          Nguồn lực
        </Typography>
        <Typography component="span" style={{ color: "white" }}>
          Đội ngũ giáo viên được tuyển chọn khắp cả nước. Tìm hiểu về chính sách
          của chúng tôi.
        </Typography>
        <Link
          href="#3"
          className="mt1 mb1"
          style={{ border: "1px solid white", color: "#fff", padding: "1rem" }}
          onClick={e => e.preventDefault()}
        >
          Tìm hiểu thêm
        </Link>
      </div>

      <Container maxWidth="lg" className="df fdc mt2">
        <Typography
          variant="h5"
          className="mt2 mb2"
          align="center"
          component="h5"
          style={{ fontWeight: 600 }}
        >
          Điểm nổi bật
        </Typography>

        <Grid container spacing={3}>
          <ItemHot
            src="/images/browser.svg"
            body1="Tương tác nhanh"
            body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
          />
          <ItemHot
            src="/images/browser.svg"
            body1="Tương tác nhanh"
            body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
          />
          <ItemHot
            src="/images/browser.svg"
            body1="Tương tác nhanh"
            body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
          />
          <ItemHot
            src="/images/browser.svg"
            body1="Tương tác nhanh"
            body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
          />
        </Grid>
      </Container>

      <Container maxWidth="lg" className="df fdc mt2 mb2">
        <Typography
          variant="h5"
          className="mt2 mb2"
          align="center"
          component="h5"
          style={{ fontWeight: 600 }}
        >
          Cách thức hoạt động
        </Typography>

        <Grid container spacing={3}>
          <ItemHot
            src="/images/postjob.jpg"
            body1="Tương tác nhanh"
            body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
          />
          <ItemHot
            src="/images/chat.png"
            body1="Tương tác nhanh"
            body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
          />
          <ItemHot
            src="/images/find.png"
            body1="Tương tác nhanh"
            body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
          />
          <ItemHot
            src="/images/pay.png"
            body1="Tương tác nhanh"
            body2=" React Hook useEffect has a missing dependency: 'getTeachers'. Either include it or remove the dependency array."
          />
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}

export default connect(
  ({ teacher }) => ({
    teachers: teacher.teachers
  }),
  { getTeachers }
)(Home);
