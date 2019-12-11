import React, { Component } from "react";
import {
  StudentHome,
  Moderators,
  TeacherHome,
  UserSignUp,
  UserSignIn,
  AdminSignIn,
  UserProfileEdit,
  UserProfileShow,
  ListTeacher,
  Verify,
  Users,
  Tags,
  Home
} from "../pages";
import { Router, Switch, Route } from "react-router-dom";
import { withAuth } from "../utils";
import history from "../utils/history";

class Routers extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/admin/sign-in" component={AdminSignIn} />
          <Route path="/sign-up" component={UserSignUp} />
          <Route path="/sign-in" component={UserSignIn} />
          <Route path="/verify/:token" component={Verify} />

          <Route path="/admin/moderators" component={withAuth(Moderators)} />
          <Route path="/admin/tags" component={withAuth(Tags)} />
          <Route path="/admin/users" component={withAuth(Users)} />

          <Route path="/list-teacher" component={ListTeacher} />
          <Route path="/teacher" component={withAuth(TeacherHome)} />

          {/* <Route path="/student" component={withAuth(StudentHome)} /> */}
          <Route path="/student" component={StudentHome} />

          <Route path="/profile/:id" component={UserProfileShow} />
          <Route path="/profile" component={UserProfileEdit} />
          <Route path="/" component={Home} />
          <Route path="*">404 - Not Found!</Route>
        </Switch>
      </Router>
    );
  }
}
export default Routers;
