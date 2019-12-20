import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Paper,
  Button
} from "@material-ui/core";
import api from "../utils/axios";

function ResetPassword() {
  const [emailSending, setemailSending] = useState(false);
  const [emailOk, setemailOk] = useState(false);
  const [email, setemail] = useState("");

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
              {emailOk ? (
                <Typography
                  component="p"
                  variant="body1"
                  className="mt1"
                  style={{ color: "green" }}
                >
                  Email đặt lại mật khẩu đã được gửi đến {email}. Đăng nhập vào
                  email và tiến hành lấy lại mật khẩu.
                </Typography>
              ) : (
                <Typography
                  component="p"
                  variant="body1"
                  color="textSecondary"
                  className="mt1"
                >
                  Điền email, chúng tôi sẽ gửi thông tin link đặt lại mật khẩu ở
                  email của bạn!
                </Typography>
              )}
            </div>
          </header>
          {!emailOk && (
            <form>
              <TextField
                className="mt1"
                fullWidth
                type="email"
                autoFocus
                required
                variant="outlined"
                placeholder="Email của bạn"
                value={email}
                onChange={e => setemail(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="mt1"
                disabled={emailSending}
                style={{ marginBottom: "2rem", padding: "1rem 0" }}
                fullWidth
                onClick={async e => {
                  setemailSending(true);
                  const response = await api.post("/sendmailresetpassword", {
                    toemail: email
                  });
                  setemailSending(false);
                  console.log("view", response);
                  if (response && response.data) setemailOk(true);
                }}
              >
                Xác nhận
              </Button>
            </form>
          )}
        </Paper>
      </Container>
    </div>
  );
}
export default ResetPassword;
