import * as types from "../types";
import api from "../utils/axios";

const isSigningUp = value => ({
  type: types.SIGNING_UP,
  payload: value
});

const signUpResponse = message => ({
  type: types.SIGN_UP_RESPONSE,
  payload: message
});

export const createUpAdmin = (
  username,
  password,
  hoten,
  email,
  ngaysinh,
  gioitinh,
  diachi,
  thanhpho,
  sdt
) => async dispatch => {
  dispatch(isSigningUp(true));

  const response = await api.post("/admin/createadmin", {
    username,
    password,
    hoten,
    email,
    ngaysinh,
    gioitinh,
    diachi,
    thanhpho,
    sdt
  });
  dispatch(signUpResponse(response && response.data));
};
