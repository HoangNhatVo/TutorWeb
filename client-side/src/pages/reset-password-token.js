import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Paper,
  Button
} from "@material-ui/core";
import api from "../utils/axios";
import history from "../utils/history";

function ResetPasswordToken() {
  const [passwordSending, setpasswordSending] = useState(false);
  const [newPassword, setnewPassword] = useState("");
  const [renewPassword, setrenewPassword] = useState("");
  const [changeOk, setchangeOk] = useState(false);
  return (
    <div className="df fdc aic" style={{ minHeight: "100vh" }}>
      <Container maxWidth="lg" className="df jcc f1">
        <Paper style={{ padding: "1rem" }}>
          <header className="df mt2">
            <img
              src="/logo.svg"
              style={{ width: 160, height: 160 }}
              alt="logo"
            />
            <div style={{ alignSelf: "flex-end" }}>
              <Typography component="h1" variant="h4">
                X-Tutor
              </Typography>
              <Typography
                component="p"
                variant="body1"
                color="textSecondary"
                className="mt1"
              >
                Nhập mật khẩu mới của bạn và ấn nút xác nhận
              </Typography>
            </div>
          </header>
          {!changeOk ? (
            <form>
              <TextField
                className="mt1"
                fullWidth
                value={newPassword}
                onChange={e => setnewPassword(e.target.value)}
                type="password"
                variant="outlined"
                placeholder="Mật khẩu"
              />
              <TextField
                className="mt1"
                type="password"
                value={renewPassword}
                error={renewPassword !== newPassword}
                onChange={e => setrenewPassword(e.target.value)}
                helperText={
                  renewPassword &&
                  renewPassword !== newPassword &&
                  "Mật khẩu nhập lại không khớp"
                }
                fullWidth
                variant="outlined"
                placeholder="Nhập lại mật khẩu"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="mt1"
                disabled={passwordSending}
                style={{ marginBottom: "2rem", padding: "1rem 0" }}
                fullWidth
                onClick={async e => {
                  setpasswordSending(true);
                  const response = await api.post("/resetpassword", {
                    verify: window.location.pathname.slice(
                      "/resetpassword".length + 1
                    ),
                    newpassword: newPassword
                  });

                  setpasswordSending(false);
                  if (response && response.data) setchangeOk(true);
                }}
              >
                Xác nhận
              </Button>
            </form>
          ) : (
            <>
              <Typography
                style={{ color: "green" }}
                className="mt1"
                align="center"
              >
                Đổi mật khẩu thành công
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className="mt1"
                style={{ marginBottom: "2rem", padding: "1rem 0" }}
                fullWidth
                onClick={() => history.push("/")}
              >
                Về đăng nhập
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}
export default ResetPasswordToken;
