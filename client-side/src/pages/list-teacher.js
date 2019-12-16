import React from "react";
import { Container, Typography } from "@material-ui/core";
import { HeaderOut, Footer, Menu, Banner, TeacherCard } from "../components";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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

function ListTeacher() {
  const classes = useStyles()
  return (
    <div className="df fdc" style={{ minHeight: "100vh" }}>
      <HeaderOut hasNoAccount hasAccount />
      <Menu></Menu>
      <Banner></Banner>
      <Container maxWidth="lg" className="df fdc f1">
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
      <Footer />
    </div>
  )
}
export default ListTeacher