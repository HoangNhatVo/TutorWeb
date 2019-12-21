import React, { Component } from "react";
import { LayoutUser } from "../../layouts";
import { Typography, Paper, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentContract } from "../../actions";
import { Avatar } from "../../components";
import moment from "moment";

function ItemInfo({ title, value }) {
  return (
    <>
      <Grid item style={{ alignSelf: "center" }} xs={2}>
        <Typography color="textSecondary" variant="body1">
          {title}
        </Typography>
      </Grid>
      <Grid item style={{ alignSelf: "center" }} xs={10}>
        <Typography variant="body1" style={{  color: "black" }}>
          {value}
        </Typography>
      </Grid>
    </>
  );
}

class ContractsView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const { currentContract } = this.props;

    if (
      (currentContract && !currentContract.id) ||
      (currentContract && id !== currentContract.id)
    )
      this.props.getCurrentContract(id);
  }

  render() {
    const { currentContract } = this.props;
    console.log("view currentContract", currentContract);
    if (!currentContract) return <div />;
    const {
      AvatarTeacher,
      AvatarStudent,
      EmailStudent,
      EmailTeacher,
      NameContract,
      NameStudent,
      NameTeacher,
      PhoneStudent,
      PhoneTeacher,
      StatusContract,
      TimeAsigned
    } = currentContract.contractData;

    return (
      <LayoutUser>
        <Grid container spacing={2} className="mb2 mt2">
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Paper
              style={{
                borderRadius: 4,
                padding: "1rem"
              }}
              elevation={2}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontWeight: 600, color: "gray" }}
                    variant="body2"
                    className="mb1"
                  >
                    Gia sư
                  </Typography>
                  <Avatar src={AvatarTeacher} alt="Ảnh đại diện" />
                  <Grid container className="mt1" spacing={1}>
                    <ItemInfo title="Họ tên" value={NameTeacher} />
                    <ItemInfo title="Email" value={EmailTeacher} />
                    <ItemInfo title="SĐT" value={PhoneTeacher} />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    style={{ fontWeight: 600, color: "gray" }}
                    variant="body2"
                    className="mb1"
                  >
                    Học sinh
                  </Typography>
                  <Avatar src={AvatarStudent} alt="Ảnh đại diện" />
                  <Grid container className="mt1" spacing={1}>
                    <ItemInfo title="Họ tên" value={NameStudent} />
                    <ItemInfo title="Email" value={EmailStudent} />
                    <ItemInfo title="SĐT" value={PhoneStudent} />
                  </Grid>
                </Grid>
              </Grid>
              <Typography
                style={{ fontWeight: 600, color: "gray" }}
                variant="body2"
                className="mb1 mt2"
              >
                Thông tin hợp đồng
              </Typography>
              <Grid container spacing={2}>
                <ItemInfo title="Tên hợp đồng" value={NameContract} />
                <ItemInfo
                  title="Thời gian bắt đầu"
                  value={moment(TimeAsigned).format("DD/MM/YYYY")}
                />
              </Grid>
              <Typography
                style={{ fontWeight: 600, color: "gray" }}
                variant="body2"
                className="mb1 mt2"
              >
                Điều khoản hợp đồng
              </Typography>
              <Grid container spacing={2}>
                <ItemInfo title="Nguoi day" value="as" />
                <ItemInfo title="Nguoi hoc" value="as" />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </LayoutUser>
    );
  }
}

export default connect(
  ({ admin }) => ({
    currentContract: admin.currentContract
  }),
  { getCurrentContract }
)(withRouter(ContractsView));
