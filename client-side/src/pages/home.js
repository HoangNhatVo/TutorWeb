import React, { useEffect } from "react";
import { HeaderOut, Footer, Menu, Banner, TeacherCard } from "../components";
import { Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getTeachers } from "../actions";
import { connect } from "react-redux";

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

function Home({ teachers, getTeachers }) {
  const classes = useStyles();

  useEffect(() => {
    getTeachers();
  }, []);

  const { isLoading } = teachers;

  return (
    <div className="df fc" style={{ minHeight: "100vh" }}>
      <HeaderOut hasNoAccount hasAccount />
      <Menu />
      <Banner />

      <Container maxWidth="lg" className="df fc f1">
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
          backgroundColor: "#312d2d",
          height: 45,
          fontSize: 18,
          textAlign: "center",
          color: "#fff",
          lineHeight: "45px",
          marginTop: 70
        }}
      >
        <span>
          Xtutor Business: We’ll help you find the perfect web developers.{" "}
        </span>
        <a href="s" style={{ color: "#fff" }}>
          Learn more.
        </a>
      </div>
      <div style={{ backgroundColor: "#fff", height: 450, padding: "100px 0" }}>
        <Container>
          <Typography
            variant="h4"
            className="mt2"
            align="center"
            component="h4"
            style={{ marginBottom: 50, fontWeight: 700 }}
          >
            Một số đặc điểm nổi bật của trang web
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <div style={{ textAlign: "center" }}>
                <img
                  src="/images/browser.svg"
                  alt="svg"
                  style={{ width: 50, height: 50 }}
                />
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>
                  Web Developers
                </p>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div style={{ textAlign: "center" }}>
                <img
                  src="/images/browser.svg"
                  alt="svg"
                  style={{ width: 50, height: 50 }}
                />
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>
                  Moblie Developers
                </p>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div style={{ textAlign: "center" }}>
                <img
                  src="/images/browser.svg"
                  alt="svg"
                  style={{ width: 50, height: 50 }}
                />
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>
                  Destop app Developers
                </p>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div style={{ textAlign: "center" }}>
                <img
                  src="/images/browser.svg"
                  alt="svg"
                  style={{ width: 50, height: 50 }}
                />
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>
                  Software Engineers
                </p>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div style={{ textAlign: "center" }}>
                <img
                  src="/images/browser.svg"
                  alt="svg"
                  style={{ width: 50, height: 50 }}
                />
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>
                  Product Managers
                </p>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div style={{ textAlign: "center" }}>
                <img
                  src="/images/browser.svg"
                  alt="svg"
                  style={{ width: 50, height: 50 }}
                />
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>
                  Software QA Testers
                </p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div style={{ height: 400, marginBottom: 100, padding: "100px 0" }}>
        <Container>
          <Typography
            variant="h4"
            className="mt2"
            align="center"
            component="h4"
            style={{ marginBottom: 50, fontWeight: 700 }}
          >
            Cách hoạt động
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <div style={{ textAlign: "center", fontSize: 16 }}>
                <img
                  src="/images/postjob.jpg"
                  alt="svg"
                  style={{ width: 100, height: 100 }}
                />
                <p style={{ fontSize: 17, fontWeight: 700, marginTop: 15 }}>
                  Post a job (it’s free)
                </p>
                <p>
                  Tell us about your project. Upwork connects you with top
                  talent around the world, or near you.
                </p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div style={{ textAlign: "center", fontSize: 16 }}>
                <img
                  src="/images/find.png"
                  alt="svg"
                  style={{ width: 100, height: 100 }}
                />
                <p style={{ fontSize: 17, fontWeight: 700, marginTop: 15 }}>
                  Freelancers come to you
                </p>
                <p>
                  Get qualified proposals within 24 hours. Compare bids,
                  reviews, and prior work. Interview favorites and hire the best
                  fit.
                </p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div style={{ textAlign: "center", fontSize: 16 }}>
                <img
                  src="/images/chat.png"
                  alt="svg"
                  style={{ width: 100, height: 100 }}
                />
                <p style={{ fontSize: 17, fontWeight: 700, marginTop: 15 }}>
                  Collaborate easily
                </p>
                <p>
                  Use Upwork to chat or video call, share files, and track
                  project milestones from your desktop or mobile.
                </p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div style={{ textAlign: "center", fontSize: 16 }}>
                <img
                  src="/images/pay.png"
                  alt="svg"
                  style={{ width: 100, height: 100 }}
                />
                <p style={{ fontSize: 17, fontWeight: 700, marginTop: 15 }}>
                  Payment simplified
                </p>
                <p>
                  Pay hourly or fixed-price and receive invoices through Upwork.
                  Pay for work you authorize.
                </p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
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
