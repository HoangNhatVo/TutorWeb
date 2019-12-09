import React from "react";
import { HeaderOut, Footer, Menu, Banner, TeacherCard } from "../components";
import { Container, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import browser from '../img/browser.svg';
import postjob from '../img/postjob.jpg';
import find from '../img/find.png';
import chat from '../img/chat.png';
import pay from '../img/pay.png'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
function Home() {
  const classes = useStyles();
  return (
    <div className="df fc" style={{ minHeight: "100vh" }}>
      <HeaderOut hasNoAccount hasAccount />
      <Menu></Menu>
      <Banner></Banner>
      <Container maxWidth="lg" className="df fc f1">
        <Typography
          variant="h4"
          className="mt2"
          align="center"
          component="h4"
          style={{ marginBottom: 20, fontWeight: 700 }}
        >
          Freelancers tiêu biểu
          </Typography>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TeacherCard className={classes.paper} />
          </Grid>
          <Grid item xs={3}>
            <TeacherCard className={classes.paper} />
          </Grid>
          <Grid item xs={3}>
            <TeacherCard className={classes.paper} />
          </Grid>
          <Grid item xs={3}>
            <TeacherCard className={classes.paper} />
          </Grid>
          <Grid item xs={3}>
            <TeacherCard className={classes.paper} />
          </Grid>
          <Grid item xs={3}>
            <TeacherCard className={classes.paper} />
          </Grid>
        </Grid>
      </Container>
      <div style={{ backgroundColor: '#312d2d', height: 45, fontSize: 18, textAlign: 'center', color: '#fff', lineHeight: '45px', marginTop: 70 }}>
        <span>Xtutor Business: We’ll help you find the perfect web developers. </span>
        <a href="#" style={{ color: '#fff' }}>Learn more.</a>
      </div>
      <div style={{ backgroundColor: '#fff', height: 450,padding:'100px 0' }}>
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
              <div style={{ textAlign: 'center' }}>
                <img src={browser} alt='svg' style={{ width: 50, height: 50 }} />
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>Web Developers</p>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div style={{ textAlign: 'center' }}>
                <img src={browser} alt='svg' style={{ width: 50, height: 50 }} />
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>Moblie Developers</p>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div style={{ textAlign: 'center' }}>
                <img src={browser} alt='svg' style={{ width: 50, height: 50 }} />
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>Destop app Developers</p>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div style={{ textAlign: 'center' }}>
                <img src={browser} alt='svg' style={{ width: 50, height: 50 }} />
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>Software Engineers</p>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div style={{ textAlign: 'center' }}>
                <img src={browser} alt='svg' style={{ width: 50, height: 50 }} />
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>Product Managers</p>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div style={{ textAlign: 'center' }}>
                <img src={browser} alt='svg' style={{ width: 50, height: 50 }} />
                <p style={{ fontSize: 16, fontWeight: 700, marginTop: 15 }}>Software QA Testers</p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div style={{height:400,marginBottom:100,padding:'100px 0'}}>
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
              <div style={{ textAlign: 'center',fontSize: 16 }}>
                <img src={postjob} alt='svg' style={{ width: 100, height: 100 }} />
                <p style={{ fontSize: 17, fontWeight: 700, marginTop: 15 }}>Post a job (it’s free)</p>
                <p>Tell us about your project. Upwork connects you with top talent around the world, or near you.</p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div style={{ textAlign: 'center',fontSize: 16 }}>
                <img src={find} alt='svg' style={{ width: 100, height: 100 }} />
                <p style={{ fontSize: 17, fontWeight: 700, marginTop: 15 }}>Freelancers come to you</p>
                <p>Get qualified proposals within 24 hours. Compare bids, reviews, and prior work. Interview favorites and hire the best fit.</p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div style={{ textAlign: 'center',fontSize: 16 }}>
                <img src={chat} alt='svg' style={{ width: 100, height: 100 }} />
                <p style={{ fontSize: 17, fontWeight: 700, marginTop: 15 }}>Collaborate easily</p>
                <p>Use Upwork to chat or video call, share files, and track project milestones from your desktop or mobile.</p>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div style={{ textAlign: 'center',fontSize: 16 }}>
                <img src={pay} alt='svg' style={{ width: 100, height: 100 }} />
                <p style={{ fontSize: 17, fontWeight: 700, marginTop: 15 }}>Payment simplified</p>
                <p>Pay hourly or fixed-price and receive invoices through Upwork. Pay for work you authorize.</p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
export default Home;
