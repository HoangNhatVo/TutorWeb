import React, { Component } from "react";
import { LayoutUser } from "../layouts";
import { Typography, Grid } from "@material-ui/core";
import { TeacherCard } from "../components";
import { getTeachers } from "../actions";
import { connect } from "react-redux";

class StudentHome extends Component {
  componentDidMount() {
    if (!this.props.isOk) this.props.getTeachers();
  }

  render() {
    const { teachers, isLoadingTeachers } = this.props;

    return (
      <LayoutUser>
        <Typography
          variant="h5"
          className="mt2 mb2"
          component="h5"
          style={{ fontWeight: 600 }}
        >
          Gia sư của bạn
        </Typography>

        <Typography
          variant="h5"
          className="mt2 mb2"
          component="h5"
          style={{ fontWeight: 600 }}
        >
          Gia sư trên hệ thống
        </Typography>

        {isLoadingTeachers ? (
          <div>Đang tải...</div>
        ) : (
          <Grid container className="mb2" spacing={2}>
            {teachers.slice(0, 10).map((teacher, index) => (
              <Grid key={index} item xs={3}>
                <TeacherCard data={teacher} />
              </Grid>
            ))}
          </Grid>
        )}
      </LayoutUser>
    );
  }
}
export default connect(
  ({ teacher }) => ({
    teachers: teacher.teachers.teachers,
    isLoadingTeachers: teacher.teachers.isLoading,
    isOk: teacher.teachers.isOk
  }),
  { getTeachers }
)(StudentHome);
