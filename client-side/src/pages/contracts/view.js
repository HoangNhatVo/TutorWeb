import React, { Component } from "react";
import { LayoutUser } from "../../layouts";
import { Typography, Paper, Grid, Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getCurrentContract,
  rejectContract,
  acceptContract,
  endContract,
  rateContract
} from "../../actions";
import { Avatar } from "../../components";
import moment from "moment";
import cookies from "../../utils/cookies";
import { Rating } from "@material-ui/lab";

function ItemInfo({ title, value }) {
  return (
    <>
      <Grid item style={{ alignSelf: "center" }} xs={2}>
        <Typography color="textSecondary" variant="body1">
          {title}
        </Typography>
      </Grid>
      <Grid item style={{ alignSelf: "center" }} xs={10}>
        <Typography variant="body1" style={{ color: "black" }}>
          {value}
        </Typography>
      </Grid>
    </>
  );
}

class ContractsView extends Component {
  constructor(props) {
    super(props);

    this.state = { score: "", cmt: "" };
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
    const {
      currentContract,
      rejectContract,
      acceptContract,
      endContract
    } = this.props;

    const {
      AvatarTeacher,
      IDContract,
      AvatarStudent,
      EmailStudent,
      EmailTeacher,
      NameContract,
      NameStudent,
      NameTeacher,
      PhoneStudent,
      PhoneTeacher,
      StatusContract,
      isAcceptting,
      isEnding,
      TimeAsigned,
      isRejecting,
      isRating,
      cmt: Comment,
      score: Score
    } = currentContract.contractData;

    const { score, cmt } = this.state;

    const isStudent = Number(cookies.get("role")) === 1;

    return (
      <LayoutUser>
        {currentContract && currentContract.isLoading ? (
          <div>Đang tải...</div>
        ) : (
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

              {StatusContract === "Chưa duyệt" && (
                <div className="mt1 df aic">
                  {isStudent ? (
                    <Button
                      onClick={() => {
                        if (
                          window &&
                          window.confirm("Bạn muốn hủy hợp đồng này?")
                        )
                          rejectContract(IDContract);
                      }}
                      disabled={isRejecting}
                      variant="contained"
                      className="p1"
                      color="secondary"
                    >
                      Hủy
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          if (
                            window &&
                            window.confirm("Bạn muốn duyệt hợp đồng này?")
                          )
                            acceptContract(IDContract);
                        }}
                        disabled={isAcceptting}
                        variant="contained"
                        className="p1"
                        color="primary"
                      >
                        Duyệt
                      </Button>
                      <Button
                        onClick={() => {
                          if (
                            window &&
                            window.confirm("Bạn muốn từ chối hợp đồng này?")
                          )
                            rejectContract(IDContract);
                        }}
                        disabled={isRejecting}
                        variant="text"
                        color="secondary"
                        className="ml1 p1"
                      >
                        Từ chối
                      </Button>
                    </>
                  )}
                </div>
              )}
              {StatusContract === "Đã từ chối" && (
                <div className="mt1 p1 df aic jcc" style={{ width: "100%" }}>
                  <Typography
                    variant="body1"
                    component="i"
                    style={{ fontWeight: 600 }}
                    color="secondary"
                  >
                    Đã từ chối
                  </Typography>
                </div>
              )}
              {StatusContract === "Đã duyệt" && (
                <div className="mt1">
                  {isStudent && (
                    <Button
                      variant="contained"
                      className="mr1 p1"
                      color="primary"
                    >
                      Thanh toán
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      if (
                        window &&
                        window.confirm("Bạn muốn kết thúc hợp đồng này?")
                      )
                        endContract(IDContract);
                    }}
                    disabled={isEnding}
                    variant="outlined"
                    className="p1"
                    color="primary"
                  >
                    Kết thúc
                  </Button>
                </div>
              )}
              {StatusContract === "Kết thúc" && (
                <div
                  className="mt1 fdc p1 df aic jcc"
                  style={{ width: "100%" }}
                >
                  <Typography
                    variant="body1"
                    component="i"
                    style={{ fontWeight: 600 }}
                    color="textSecondary"
                  >
                    Đã kết thúc
                  </Typography>

                  {Score ? (
                    <>
                      <Rating
                        className="mt1"
                        name="read-only"
                        value={Score}
                        readOnly
                      />
                      {Comment && (
                        <Typography
                          variant="body1"
                          component="i"
                          color="primary"
                          align="center"
                          className="mt2"
                        >
                          "{Comment}"
                        </Typography>
                      )}
                    </>
                  ) : (
                    <>
                      <Typography variant="body1" className="mt2">
                        Đánh giá
                      </Typography>
                      <Rating
                        className="mt1"
                        value={score}
                        onChange={(event, newValue) => {
                          this.setState({ score: newValue });
                        }}
                      />
                      <TextField
                        fullWidth
                        placeholder="Nêu nhận xét của bạn về khóa học..."
                        value={cmt}
                        inputProps={{ style: { textAlign: "center" } }}
                        onChange={e => this.setState({ cmt: e.target.value })}
                        className="mt1"
                      />
                      <Button
                        onClick={() => {
                          if (score)
                            this.props.rateContract(
                              this.props.match.params.id,
                              cmt,
                              score
                            );
                        }}
                        disabled={isRating}
                        variant="contained"
                        className="p1 mt1"
                        color="primary"
                      >
                        Đánh giá
                      </Button>
                    </>
                  )}
                </div>
              )}
            </Grid>
          </Grid>
        )}
      </LayoutUser>
    );
  }
}

export default connect(
  ({ admin }) => ({
    currentContract: admin.currentContract
  }),
  {
    getCurrentContract,
    rejectContract,
    acceptContract,
    endContract,
    rateContract
  }
)(withRouter(ContractsView));
