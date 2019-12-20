import React, { Component } from "react";
import { LayoutUser } from "../layouts";
import { Typography, Grid, Paper, Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./style/teacher-home.css";
class TeacherHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LayoutUser>
        <Typography
          variant="h5"
          className="mt2 mb1"
          component="h5"
          style={{ fontWeight: 600 }}
        >
          Hợp đồng mới
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper
              className="df fdc"
              style={{
                borderRadius: 4,
                overflow: "hidden",
                padding: "1rem"
              }}
              elevation={2}
            >
              <Typography style={{ fontWeight: 600 }}>
                Ten hop dong ne
              </Typography>

              <Typography color="textSecondary" variant="body2">
                Thoi gian bat dau ne
              </Typography>

              <div className="mt1 df aic">
                <Avatar style={{ width: 28, height: 28 }} />
                <Typography className="ml1">Ten hoc sinh ne</Typography>
              </div>
              <div className="mt1">
                <Button variant="contained" color="primary">
                  Duyet
                </Button>
                <Button variant="text" color="secondary" className="ml1">
                  Tu choi
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Typography
          variant="h5"
          className="mt2 mb1"
          component="h5"
          style={{ fontWeight: 600 }}
        >
          Hợp đồng đang diễn ra
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper
              className="df fdc"
              style={{
                borderRadius: 4,
                overflow: "hidden",
                padding: "1rem"
              }}
              elevation={2}
            >
              <Typography style={{ fontWeight: 600 }}>
                Ten hop dong ne
              </Typography>

              <Typography color="textSecondary" variant="body2">
                Thoi gian bat dau ne
              </Typography>

              <div className="mt1 df aic">
                <Avatar style={{ width: 28, height: 28 }} />
                <Typography className="ml1">Ten hoc sinh ne</Typography>
              </div>
              <div className="mt1">
                <Button variant="contained" color="primary">
                  Duyet
                </Button>
                <Button variant="text" color="secondary" className="ml1">
                  Tu choi
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Typography
          variant="h5"
          className="mt2 mb1"
          component="h5"
          style={{ fontWeight: 600 }}
        >
          Hợp đồng đã thực hiện
        </Typography>
        <Grid container spacing={2} className="mb2">
          <Grid item xs={3}>
            <Paper
              className="df fdc"
              style={{
                borderRadius: 4,
                overflow: "hidden",
                padding: "1rem"
              }}
              elevation={2}
            >
              <Typography style={{ fontWeight: 600 }}>
                Ten hop dong ne
              </Typography>

              <Typography color="textSecondary" variant="body2">
                Thoi gian bat dau ne
              </Typography>

              <div className="mt1 df aic">
                <Avatar style={{ width: 28, height: 28 }} />
                <Typography className="ml1">Ten hoc sinh ne</Typography>
              </div>
              <div className="mt1">
                <Button variant="contained" color="primary">
                  Duyet
                </Button>
                <Button variant="text" color="secondary" className="ml1">
                  Tu choi
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </LayoutUser>
    );
  }
}
export default TeacherHome;
