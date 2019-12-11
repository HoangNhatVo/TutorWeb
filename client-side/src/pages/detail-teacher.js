import React from "react";
import { HeaderOut, Footer, Menu, Banner, TeacherCard } from "../components";
import { Container, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './style/detail-teacher.css'
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

function DetailTeacher() {
  const classes = useStyles();

  return (
    <div className="df fc" style={{ minHeight: "100vh" }}>
      <HeaderOut hasNoAccount hasAccount />
      <Menu></Menu>
      <Container style={{ marginTop: 30 }}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <div className="detail-teacher">
              <div className="header-teacher">
                <img src="data:image/jpeg;base64,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" />
                <div className='name-teacher'>
                  <p style={{ fontSize: 22 }}>Remon R.</p>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>Assuit, Egypt</p>
                </div>
              </div>
              <div className="description">
                <h2>Arabic Copywriter /English to Arabic translator/ Php & Wordpress dev</h2>
                <p>My Name is Remon R. Azmy</p>
                <p>Copywriter and professional translator (English to Arabic and vice versa). Over the last fours years, I have provided great content and translations for a large number of websites and publishing houses.</p>
                <p>Passed Upwork’s English to Arabic translation test and got the top rank (All time first place!)</p>
                <p>The field of translation that I am most experienced with is that of the Financial Markets, and I feel honored to have worked as a leader for... more</p>
              </div>
              <div className='detail-footer'>
                <div className="index-teacher">
                  <h3>$45.00</h3>
                  <p>Hourly rate</p>
                </div>
                <div className="index-teacher">
                  <h3>$70k+</h3>
                  <p>Total earned</p>
                </div>
                <div className="index-teacher">
                  <h3>127</h3>
                  <p>Jobs</p>
                </div>
                <div className="index-teacher">
                  <h3>721</h3>
                  <p>Hours worked</p>
                </div>
              </div>
            </div>
            <div className="history-teacher">
              <p style={{ fontSize: 24, paddingBottom: '20px', borderBottom: '1px solid #ccc' }}>Work history and feedback</p>
              <div className="list-history">
                <div className="item-history">
                  <div className="content-history">
                    <h3>Prof Reading and Translation</h3>
                    <p>Nov 2018 - Dec 2018</p>
                  </div>
                  <div className="price-history">
                    <h3>$120.00</h3>
                    <p>Fixed-price</p>
                  </div>
                </div>
                <div className="item-history">
                  <div className="content-history">
                    <h3>Prof Reading and Translation</h3>
                    <p>Nov 2018 - Dec 2018</p>
                  </div>
                  <div className="price-history">
                    <h3>$120.00</h3>
                    <p>Fixed-price</p>
                  </div>
                </div>
                <div className="item-history">
                  <div className="content-history">
                    <h3>Prof Reading and Translation</h3>
                    <p>Nov 2018 - Dec 2018</p>
                  </div>
                  <div className="price-history">
                    <h3>$120.00</h3>
                    <p>Fixed-price</p>
                  </div>
                </div>
              </div>
              <p>View more (31/44)</p>
            </div>
            <div className='skill-teacher'>
              <p style={{ fontSize: 24, paddingBottom: '20px', borderBottom: '1px solid #ccc' }}>Skills</p>
              <div className="skill">
                <p>Translation English Arbic</p>
                <p>Article Writing</p>
                <p>C#</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className="contact">
              <h1>To discuss your project with Remon, sign up.</h1>
              <p>We’ll connect you two when your job is posted.</p>
              <form>
                <div className='form-group'>
                  <input placeholder="First name" />
                </div>
                <div className='form-group'>
                  <input placeholder="Last name" />
                </div>
                <div className='form-group'>
                  <input placeholder="Work email addres" />
                </div>
                <Button variant="contained" color="secondary">
                  Contact
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default DetailTeacher