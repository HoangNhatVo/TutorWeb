import React, { Component } from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { rejectContract, acceptContract, endContract } from "../actions";
import { connect } from "react-redux";
import { Avatar } from "./common";
import { Link } from "react-router-dom";
import history from "../utils/history";

class ContractItem extends Component {
  render() {
    const {
      contract,
      pending,
      doing,
      ended,
      isStudent,
      rejectContract,
      acceptContract,
      endContract
    } = this.props;
    return (
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
          <Link
            to={`/contract/${contract.IDContract}`}
            style={{ textDecoration: "none" }}
          >
            <Typography color="textPrimary" variant="body1">
              <b>{contract.NameContract}</b>
            </Typography>
          </Link>

          <Typography color="textSecondary" variant="body2">
            {moment(contract.TimeAsigned).format("DD/MM/YYYY")}
          </Typography>

          <div className="mt1 df aic">
            <Avatar
              src={!isStudent ? contract.AvatarStudent : contract.AvatarTeacher}
              style={{ width: 28, height: 28 }}
            />
            {!isStudent ? (
              <Typography className="ml1">
                Học sinh: <b>{contract.NameStudent}</b>
              </Typography>
            ) : (
              <Typography className="ml1">
                Giáo viên: <b>{contract.NameTeacher}</b>
              </Typography>
            )}
          </div>
          {pending && (
            <div className="mt1 df aic">
              {isStudent ? (
                <>
                  <Button
                    onClick={() => {
                      if (
                        window &&
                        window.confirm("Bạn muốn hủy hợp đồng này?")
                      )
                        rejectContract(contract.IDContract);
                    }}
                    disabled={contract.isRejecting}
                    variant="contained"
                    color="secondary"
                  >
                    Hủy
                  </Button>
                  <Typography className="ml1" color="textSecondary">
                    Đang chờ duyệt...
                  </Typography>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      if (
                        window &&
                        window.confirm("Bạn muốn duyệt hợp đồng này?")
                      )
                        acceptContract(contract.IDContract);
                    }}
                    disabled={contract.isAcceptting}
                    variant="contained"
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
                        rejectContract(contract.IDContract);
                    }}
                    disabled={contract.isRejecting}
                    variant="text"
                    color="secondary"
                    className="ml1"
                  >
                    Từ chối
                  </Button>
                </>
              )}
            </div>
          )}
          {doing && (
            <div className="mt1">
              {isStudent && (
                <Button variant="contained" className="mr1" color="primary">
                  Thanh toán
                </Button>
              )}
              <Button
                onClick={() => {
                  if (
                    window &&
                    window.confirm("Bạn muốn kết thúc hợp đồng này?")
                  )
                    endContract(contract.IDContract);
                }}
                disabled={contract.isEnding}
                variant="outlined"
                color="primary"
              >
                Kết thúc
              </Button>
            </div>
          )}
          {ended && (
            <div className="mt1">
              <Button
                onClick={() => history.push(`/contract/${contract.IDContract}`)}
                variant="text"
                color="primary"
              >
                Xem chi tiết
              </Button>
            </div>
          )}
        </Paper>
      </Grid>
    );
  }
}

export default connect(null, {
  rejectContract,
  acceptContract,
  endContract
})(ContractItem);
