import React, { Component } from "react";
import { LayoutUser } from "../layouts";
import { Typography } from "@material-ui/core";

class StudentHome extends Component {
  render() {
    return (
      <LayoutUser>
        <Typography variant="h4" className="mt2" align="center" component="h4">
          Hello view hoc sinh
        </Typography>
      </LayoutUser>
    );
  }
}
export default StudentHome;
