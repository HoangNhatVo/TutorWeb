import React, { Component } from "react";
import {
  StudentHome,
  AdminHome,
  TeacherHome,
  UserSignUp,
  UserSignIn,
  AdminSignIn
} from "../pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuth } from "../utils";

class Routers extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin/sign-in" component={AdminSignIn} />
          <Route path="/sign-up" component={UserSignUp} />
          <Route path="/sign-in" component={UserSignIn} />
          <Route path="/student" component={withAuth(StudentHome)} />
          <Route path="/admin" component={withAuth(AdminHome)} />
          <Route path="/teacher" component={withAuth(TeacherHome)} />
          <Route path="*">404 - Not Found!</Route>
        </Switch>
      </Router>
    );
  }
}
export default Routers;
