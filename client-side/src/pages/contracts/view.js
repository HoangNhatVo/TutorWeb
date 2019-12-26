import React, { Component } from "react";
import { LayoutUser } from "../../layouts";
import { Typography, Paper, Grid, Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getCurrentContract,
  reclamationContract,
  rejectContract,
  acceptContract,
  endContract,
  chat,
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

    this.state = {
      score: "",
      cmt: "",
      reclamation: "",
      isCheckOn: false,
      message: ""
    };
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
      IDTeacher,
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
      isReclamating,
      noidung: Reclamation,
      CMTContract: Comment,
      ScoreContract: Score,
      isChatting,
      dkhd,
      knhd,
      chats
    } = currentContract.contractData;

    const { score, cmt, reclamation, isCheckOn, message } = this.state;

    const isStudent = Number(cookies.get("role")) === 1;

    return (
      <LayoutUser>
        {currentContract && currentContract.isLoading ? (
          <div>Đang tải...</div>
        ) : (
          <Grid container spacing={2} className="mb2 mt2">
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
                  {dkhd &&
                    typeof dkhd !== "string" &&
                    dkhd.map((i, index) => (
                      <ItemInfo
                        title={i.benthuchien}
                        value={i.noidung}
                        key={index}
                      />
                    ))}
                  {typeof dkhd === "string" && (
                    <Typography
                      style={{ color: "gray" }}
                      component="i"
                      className="mb1 ml1"
                    >
                      {dkhd}
                    </Typography>
                  )}
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
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center"
                    }}
                  >
                    <div style={{ flex: 1 }} className="df fdc aic jcc">
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
                              Đánh giá: "{Comment}"
                            </Typography>
                          )}
                        </>
                      ) : (
                        <>
                          <Typography variant="body1" className="mt2">
                            Đánh giá
                          </Typography>
                          <Rating
                            name="rate"
                            className="mt1"
                            value={Number(score)}
                            onChange={(event, newValue) => {
                              this.setState({ score: newValue });
                            }}
                          />
                          <TextField
                            fullWidth
                            placeholder="Nêu nhận xét của bạn về khóa học..."
                            value={cmt}
                            inputProps={{ style: { textAlign: "center" } }}
                            onChange={e =>
                              this.setState({ cmt: e.target.value })
                            }
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
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body2"
                      className="ml1 mr1"
                    >
                      Hoặc
                    </Typography>
                    <div style={{ flex: 1 }} className="df fdc aic jcc">
                      {knhd[0] || Reclamation ? (
                        <Typography
                          variant="body1"
                          component="i"
                          color="secondary"
                          align="center"
                          className="mt2"
                        >
                          Khiếu nại: "{knhd[0].NoiDungKN || Reclamation}"
                        </Typography>
                      ) : (
                        <>
                          <Typography variant="body1" className="mt2">
                            Khiếu nại
                          </Typography>

                          <div style={{ height: 34 }} />
                          <TextField
                            fullWidth
                            placeholder="Trình bày lý do khiếu nại..."
                            value={reclamation}
                            error={isCheckOn && !reclamation}
                            helperText={
                              isCheckOn &&
                              !reclamation &&
                              "Hãy điền lý do khiếu nại"
                            }
                            inputProps={{ style: { textAlign: "center" } }}
                            onChange={e =>
                              this.setState({ reclamation: e.target.value })
                            }
                            className="mt1"
                          />
                          <Button
                            onClick={() => {
                              this.setState({ isCheckOn: true });
                              if (reclamation)
                                this.props.reclamationContract(
                                  cookies.get("id"),
                                  this.props.match.params.id,
                                  reclamation
                                );
                            }}
                            disabled={isReclamating}
                            variant="contained"
                            className="p1 mt1"
                            color="secondary"
                          >
                            Khiếu nại
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Grid>
            <Grid item xs={4}>
              <Paper
                style={{
                  borderRadius: 4,
                  padding: "1rem"
                }}
                elevation={2}
              >
                <Typography
                  style={{ fontWeight: 600, color: "gray" }}
                  variant="body2"
                  className="mb1"
                >
                  Tin nhắn
                </Typography>
                {chats && typeof chats === "string" && (
                  <Typography
                    style={{ color: "gray" }}
                    className="mb1"
                    component="i"
                  >
                    {chats}
                  </Typography>
                )}
                {chats &&
                  typeof chats !== "string" &&
                  chats.map((i, index) => (
                    <div className="df mb1" key={index}>
                      <Avatar
                        src={i.AvatarNguoiGui}
                        name={i.TenNguoiGui}
                        alt={i.TenNguoiGui}
                      />
                      <div className="f1 ml1">
                        <Typography
                          style={{ fontWeight: 400, color: "black" }}
                          variant="body1"
                          gutterBottom
                        >
                          {i.TenNguoiGui}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {i.NoiDungChat}
                        </Typography>
                      </div>
                    </div>
                  ))}

                <TextField
                  fullWidth
                  placeholder="Nhập tin nhắn..."
                  value={message}
                  onChange={e => this.setState({ message: e.target.value })}
                  className="mt1"
                />
                <Button
                  onClick={() => {
                    if (message) {
                      this.props.chat(IDTeacher, message, IDContract);
                      this.setState({ message: "" });
                    }
                  }}
                  disabled={isChatting}
                  variant="contained"
                  className="p1 mt1"
                  color="primary"
                >
                  Gửi
                </Button>
              </Paper>
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
    chat,
    rateContract,
    reclamationContract
  }
)(withRouter(ContractsView));
