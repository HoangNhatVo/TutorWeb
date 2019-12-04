import React, { Component } from "react";
import { LayoutUser } from "../layouts";
import { Typography } from "@material-ui/core";

class TeacherHome extends Component {
  render() {
    return (
      <LayoutUser>
        <Typography variant="h4" className="mt2" align="center" component="h4">
          Hello view giao vien
        </Typography>
      </LayoutUser>
    );
  }
}
export default TeacherHome;
