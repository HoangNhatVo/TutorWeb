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

const isSigningIn = value => ({
  type: types.SIGNING_IN,
  payload: value
});

const signInResponse = message => ({
  type: types.SIGN_IN_RESPONSE,
  payload: message
});

export const signUpStudent = (
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

  const response = await api.post("/studentregister", {
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
  dispatch(isSigningUp(false));
  dispatch(signUpResponse(response && response.data));
};

export const signUpTeacher = (
  username,
  password,
  hoten,
  email,
  ngaysinh,
  gioitinh,
  diachi,
  thanhpho,
  sdt,
  baigioithieu,
  monhoc,
  chuyennganh,
  tienday
) => async dispatch => {
  dispatch(isSigningUp(true));

  const response = await api.post("/teacherregister", {
    username,
    password,
    hoten,
    email,
    ngaysinh,
    gioitinh,
    diachi,
    thanhpho,
    sdt,
    baigioithieu,
    monhoc,
    chuyennganh,
    tienday
  });
  dispatch(isSigningUp(false));
  dispatch(signUpResponse(response && response.data));
};

export const signIn = (username, password) => async dispatch => {
  dispatch(isSigningIn(true));

  const response = await api.post("/login", {
    username,
    password
  });

  console.log(response);
  dispatch(isSigningIn(false));
  dispatch(signInResponse(response && response.data));
};
