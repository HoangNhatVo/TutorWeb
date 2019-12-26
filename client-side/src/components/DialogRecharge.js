import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import { recharge } from "../actions";
import { withSnackbar } from "notistack";

class DialogRecharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seri: "",
      isCheckOn: false
    };
  }

  render() {
    const {
      rechargeInfo,
      open,
      recharge,
      changeOpen,
      enqueueSnackbar
    } = this.props;

    const { seri, isCheckOn } = this.state;

    return (
      <Dialog open={open} maxWidth="sm" fullWidth onClose={changeOpen}>
        <DialogTitle>Nạp tiền</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            className="mt2"
            label="Nhập số seri"
            helperText={isCheckOn && !seri && "Không được để trống"}
            error={isCheckOn && !seri}
            value={seri}
            onChange={e => {
              this.setState({ seri: e.target.value });
            }}
          />
          <DialogActions>
            <Button variant="text" color="secondary" onClick={changeOpen}>
              Hủy
            </Button>
            <Button
              variant="text"
              color="primary"
              disabled={rechargeInfo.isRecharging}
              onClick={() => {
                this.setState({ isCheckOn: true });
                if (!seri) return;
                recharge(seri, {
                  suc: () => {
                    enqueueSnackbar("Nạp thành công", {
                      variant: "success"
                    });
                    changeOpen()
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
  ({ auth }) => ({
    rechargeInfo: auth.recharge
  }),
  { recharge }
)(withSnackbar(DialogRecharge));
