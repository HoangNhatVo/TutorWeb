import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  DialogActions,
  Button
} from "@material-ui/core";
import { Avatar } from "./common";
import { payContract } from "../actions";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

class DialogPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: 0
    };
  }

  handleClose = () => {
    this.props.onClose();
    this.setState({ hours: 0 });
  };

  render() {
    const { user, open, payContract, pay, enqueueSnackbar } = this.props;

    const { hours } = this.state;

    return (
      <Dialog open={open} onClose={this.handleClose}>
        <DialogTitle>Thanh toán</DialogTitle>
        <DialogContent>
          <div className="df aic">
            <Avatar src={user.avatar} alt={user.name} />
            <Typography className="ml1" component="b">
              Người nhận: {user.name}
            </Typography>
          </div>
          <TextField
            fullWidth
            className="mt1"
            label="Nhập số giờ muốn thanh toán"
            value={hours}
            onChange={e => {
              this.setState({ hours: e.target.value });
            }}
          />
          <DialogActions>
            <Button variant="text" color="secondary" onClick={this.handleClose}>
              Hủy
            </Button>
            <Button
              variant="text"
              color="primary"
              disabled={pay.isPaying}
              onClick={() => {
                payContract(hours, user.id, {
                  suc: () => {
                    enqueueSnackbar("Thanh toán thành công", {
                      variant: "success"
                    });
                    this.setState({ hours: 0 });
                  },
                  err: mes => {
                    enqueueSnackbar(mes, {
                      variant: "error"
                    });
                  }
                });
              }}
            >
              Xác nhận
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

export default connect(
  ({ teacher }) => ({
    pay: teacher.pay
  }),
  { payContract }
)(withSnackbar(DialogPay));
