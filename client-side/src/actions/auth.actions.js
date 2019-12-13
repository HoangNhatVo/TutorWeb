import * as types from "../types";
import api from "../utils/axios";
import cookies from "../utils/cookies";
import history from "../utils/history";
import ref from "../utils/firebase-storage";

const isSigningUp = () => ({
  type: types.SIGNING_UP
});

const signUpResponse = message => ({
  type: types.SIGN_UP_RESPONSE,
  payload: message
});

const isSigningIn = () => ({
  type: types.SIGNING_IN
});

const signInResponse = message => ({
  type: types.SIGN_IN_RESPONSE,
  payload: message
});

const signInSuccessfully = data => ({
  type: types.SIGN_IN_SUCCESSFULLY,
  payload: data
});

const isGettingProfile = () => ({
  type: types.IS_GETTING_PROFILE
});

const getProfileSuccessfully = data => ({
  type: types.GET_PROFILE_SUCCESSFULLY,
  payload: data
});

const updatingDescription = () => ({
  type: types.UPDATING_DESCTIPTION
});

const updateDescriptionResponse = data => ({
  type: types.UPDATE_DESCTIPTION_RESPONSE,
  payload: data
});

const updatingBasicInfo = () => ({
  type: types.UPDATING_BASIC_INFO
});

const updateBasicInfoResponse = (name, address) => ({
  type: types.UPDATE_BASIC_INFO_RESPONSE,
  payload: { hoten: name, diachi: address }
});

const updatingAvatar = () => ({
  type: types.UPDATING_AVATAR
});

const updateAvatarResponse = data => ({
  type: types.UPDATE_AVATAR_RESPONSE,
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
  dispatch(isSigningUp());

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
  dispatch(isSigningUp());

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

  dispatch(signUpResponse(response && response.data));
};

export const signIn = (username, password) => async dispatch => {
  dispatch(isSigningIn());

  const response = await api.post("/login", {
    username,
    password
  });

  if (response) {
    if (typeof response.data === "string")
      dispatch(signInResponse(response.data));
    //success
    else {
      const userData = response.data[0];
      dispatch(signInSuccessfully(userData));
      cookies.set("token", userData.chuoixacthuc);
      cookies.set("role", userData.vaitro);
      cookies.set("id", userData.id);

      const role = userData.vaitro;
      if (role === 1) history.push("/student");
      else if (role === 2) history.push("/teacher");
      else if (role === 3) history.push("/admin/moderators");
    }
  }
};

export const getProfile = cb => async dispatch => {
  dispatch(isGettingProfile());

  const response = await api.get(`/profile/${cookies.get("id")}`);

  if (response) {
    if (typeof response.data === "string")
      dispatch(getProfileSuccessfully(response.data));
    //success
    else {
      const userData = response.data;
      dispatch(getProfileSuccessfully(userData));
    }
  }
  if (cb) cb();
};

export const updateDescription = content => async dispatch => {
  dispatch(updatingDescription());

  const response = await api.post("/user/updateIntroduce", {
    iduser: cookies.get("id"),
    content
  });

  if (response && response.data === "Cập nhật thành công")
    dispatch(updateDescriptionResponse(content));
};

export const updateBasicInfo = (name, address) => async dispatch => {
  dispatch(updatingBasicInfo());

  const response = await api.post("/user/updateInfor", {
    iduser: cookies.get("id"),
    name,
    address
  });
  if (response && response.data === "Cập nhật thành công")
    dispatch(updateBasicInfoResponse(name, address));
};

export const updateAvatar = base64 => dispatch => {
  dispatch(updatingAvatar());

  ref
    .child(`${cookies.get("id")}`)
    .putString(base64.replace(/^data:image\/(png|jpg);base64,/, ""), "base64")
    .then(function(snapshot) {
      // upload avatar ok
      ref
        .child(`${cookies.get("id")}`)
        .getDownloadURL()
        .then(async url => {
          api.post("/user/updateIntroduce", {
            iduser: cookies.get("id"),
            url
          });
          dispatch(updateAvatarResponse(url));
        });
    });
};

export const signOut = () => async dispatch => {
  dispatch(signInSuccessfully(null));
  cookies.remove("token");
  cookies.remove("role");
  cookies.remove("id");
  history.push("/sign-in");
};
