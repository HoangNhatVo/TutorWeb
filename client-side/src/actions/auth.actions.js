import * as types from "../types";
import api from "../utils/axios";
import cookies from "../utils/cookies";
import history from "../utils/history";

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

const signInSuccessfully = data => ({
  type: types.SIGN_IN_SUCCESSFULLY,
  payload: data
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

  dispatch(isSigningIn(false));

  if (response) {
    if (typeof response.data === "string")
      dispatch(signInResponse(response.data));
    //success
    else {
      const userData = response.data[0];
      dispatch(signInSuccessfully(userData));
      cookies.set("token", userData.chuoixacthuc);
      cookies.set("role", userData.vaitro);

      const role = userData.vaitro;
      if (role === 1) history.push("/student");
      else if (role === 2) history.push("/teacher");
      else if (role === 3) history.push("/admin/moderators");
    }
  }
};

export const signOut = () => async dispatch => {
  dispatch(signInSuccessfully(null));
  cookies.remove("token");
  cookies.remove("role");
  history.push("/sign-in");
};
