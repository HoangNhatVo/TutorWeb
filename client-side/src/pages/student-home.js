import React, { Component } from "react";
import { LayoutUser } from "../layouts";
import { Typography, Grid } from "@material-ui/core";
import { TeacherCard, ContractItem } from "../components";
import {
  getTeachers,
  getSpecializes,
  getCurrentContractList
} from "../actions";
import { connect } from "react-redux";

class StudentHome extends Component {
  componentDidMount() {
    const { specializes } = this.props;
    if (!this.props.isOk) this.props.getTeachers();
    if (specializes && !specializes.isOk) this.props.getSpecializes();
    this.props.getCurrentContractList();
  }

  render() {
    const { teachers, isLoadingTeachers, myContracts } = this.props;

    const pendingList = myContracts.contracts.filter(
      contract => contract.StatusContract === "Chưa duyệt"
    );
    const doingList = myContracts.contracts.filter(
      contract => contract.StatusContract === "Đã duyệt"
    );
    const endedList = myContracts.contracts.filter(
      contract => contract.StatusContract === "Kết thúc"
    );

    return (
      <LayoutUser>
        {pendingList.length !== 0 && (
          <>
            <Typography
              variant="h5"
              className="mt2 mb1"
              component="h5"
              style={{ fontWeight: 600 }}
            >
              Yêu cầu của bạn
            </Typography>
            <Grid container spacing={2}>
              {pendingList.map(contract => (
                <ContractItem
                  isStudent
                  pending
                  contract={contract}
                  key={contract.IDContract}
                />
              ))}
            </Grid>
          </>
        )}

        {doingList.length !== 0 && (
          <>
            <Typography
              variant="h5"
              className="mt2 mb1"
              component="h5"
              style={{ fontWeight: 600 }}
            >
              Gia sư của bạn
            </Typography>
            <Grid container spacing={2}>
              {doingList.map(contract => (
                <ContractItem
                  isStudent
                  doing
                  contract={contract}
                  key={contract.IDContract}
                />
              ))}
            </Grid>
          </>
        )}

        {endedList.length !== 0 && (
          <>
            <Typography
              variant="h5"
              className="mt2 mb1"
              component="h5"
              style={{ fontWeight: 600 }}
            >
              Đã học xong
            </Typography>
            <Grid container spacing={2}>
              {endedList.map(contract => (
                <ContractItem
                  isStudent
                  ended
                  contract={contract}
                  key={contract.IDContract}
                />
              ))}
            </Grid>
          </>
        )}

        <Typography
          variant="h5"
          className="mt2 mb1"
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
  ({ teacher, utils }) => ({
    specializes: utils.specializes,
    teachers: teacher.teachers.teachers,
    isLoadingTeachers: teacher.teachers.isLoading,
    isOk: teacher.teachers.isOk,
    myContracts: teacher.myContracts
  }),
  { getTeachers, getSpecializes, getCurrentContractList }
)(StudentHome);
