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

const updatingTags = () => ({
  type: types.UPDATING_TAGS
});

const updateTagsOk = id => ({
  type: types.UPDATE_TAGS_RESPONSE,
  payload: id
});

const updatingPassword = () => ({
  type: types.UPDATING_PASSWORD
});

const updatePasswordResponse = data => ({
  type: types.UPDATE_PASSWORD_RESPONSE,
  payload: data
});

const addAdmin = data => ({
  type: types.ADD_ADMIN_SUCCESS,
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

export const signUpAdmin = (
  username,
  password,
  hoten,
  email,
  ngaysinh,
  gioitinh,
  diachi,
  thanhpho,
  sdt,
  cbs
) => async dispatch => {
  dispatch(isSigningUp());

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
  if (response && response.data === "Thành công") {
    dispatch(
      addAdmin({
        username,
        password,
        hoten,
        email,
        ngaysinh,
        gioitinh,
        diachi,
        thanhpho,
        sdt
      })
    );
    if (cbs.suc) cbs.suc();
  }
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
    // success
    else {
      const userData = response.data[0];
      dispatch(signInSuccessfully(userData));
      cookies.set("token", userData.chuoixacthuc);
      cookies.set("role", userData.vaitro);
      cookies.set("id", userData.id);

      // vi truong tra ve luc dang nhap khac voi truong get profile nen bat dac di~ :))
      const response2 = await api.get(`/profile/${cookies.get("id")}`);
      const response3 = await api.get(
        `${
          Number(cookies.get("role")) === 1
            ? "/user/moneyStudent"
            : "/admin/Incometeacher"
        }/${cookies.get("id")}`
      );

      if (response2) {
        if (response2.data && typeof response2.data.user === "object") {
          const userData = response2.data.user;
          dispatch(
            getProfileSuccessfully({
              ...userData,
              tags: response2.data.tag
                ? response2.data.tag.map(tag => tag.IDTag)
                : [],
              income: response3.data
            })
          );
        } else dispatch(getProfileSuccessfully(response2.data));
      }

      const role = userData.vaitro;
      if (role === 1) history.push("/student");
      else if (role === 2) history.push("/teacher");
      else if (role === 3) {
        cookies.remove("token");
        cookies.remove("role");
        cookies.remove("id");
        cookies.set("role", userData.vaitro);
        cookies.set("id", userData.id);
        cookies.set("token", "3");
        history.push("/admin/income");
      } else history.push("/");
    }
  }
};

export const getProfile = () => async dispatch => {
  dispatch(isGettingProfile());

  const response = await api.get(`/profile/${cookies.get("id")}`);
  const response3 = await api.get(
    `${
      Number(cookies.get("role")) === 1
        ? "/user/moneyStudent"
        : "/admin/Incometeacher"
    }/${cookies.get("id")}`
  );
  if (response) {
    if (response.data && typeof response.data.user === "object") {
      const userData = response.data.user;
      dispatch(
        getProfileSuccessfully({
          ...userData,
          tags: response.data.tag
            ? response.data.tag.map(tag => tag.IDTag)
            : [],
          income: response3.data
        })
      );
    } else dispatch(getProfileSuccessfully(response.data));
  }
};

export const updateDescription = (content, cbs) => async dispatch => {
  dispatch(updatingDescription());

  const response = await api.post("/user/updateIntroduce", {
    iduser: cookies.get("id"),
    content
  });

  if (response && response.data === "Cập nhật thành công") {
    dispatch(updateDescriptionResponse(content));
    if (cbs && cbs.suc) cbs.suc();
  } else {
    if (cbs && cbs.err) cbs.err(response.data);
  }
};

export const updateBasicInfo = (name, address, cbs) => async dispatch => {
  dispatch(updatingBasicInfo());

  const response = await api.post("/user/updateInfor", {
    iduser: cookies.get("id"),
    name,
    address
  });
  if (response && response.data === "Cập nhật thành công") {
    dispatch(updateBasicInfoResponse(name, address));
    if (cbs && cbs.suc) cbs.suc();
  } else {
    if (cbs && cbs.err) cbs.err(response.data);
  }
};

export const updateTags = (tags, cbs) => async dispatch => {
  dispatch(updatingTags());

  if (!tags) return;

  tags.map(
    async idtag => {
      const response = await api.post("/addtagaccount", {
        idtag,
        idaccount: cookies.get("id")
      });

      if (response && response.data === "Thành công") {
        dispatch(updateTagsOk(tags));
        if (cbs && cbs.suc) cbs.suc();
      }
    }
    // else {
    //   if (cbs && cbs.err) cbs.err("Cập nhật thất bại");
    // }
  );
};

export const updatePassword = (
  curpassword,
  newpassword,
  cbs
) => async dispatch => {
  dispatch(updatingPassword());

  const response = await api.post("/changepassword", {
    id: cookies.get("id"),
    curpassword,
    newpassword
  });
  if (response && response.data) {
    dispatch(updatePasswordResponse(response.data));
    if (cbs && cbs.suc) cbs.suc();
  } else {
    if (cbs && cbs.err) cbs.err(response.data);
  }
};

export const updateAvatar = (base64, cbs) => dispatch => {
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
          api.post("/user/updateAva", {
            iduser: cookies.get("id"),
            ava: url
          });
          dispatch(updateAvatarResponse(url));
          if (cbs && cbs.suc) cbs.suc();
        });
    });
};

export const signOut = () => async dispatch => {
  cookies.remove("token");
  cookies.remove("role");
  cookies.remove("id");

  dispatch({ type: types.RESET });

  history.push("/sign-in");
};

export const recharge = (seri, cbs) => async dispatch => {
  dispatch({ type: types.RECHARGE, payload: { isRecharging: true } });

  const response = await api.post("/user/recharge", {
    Iduser: cookies.get("id"),
    seri
  });
  if (response && response.data === "Thành công") {
    dispatch({
      type: types.RECHARGE,
      payload: { isRecharging: false, true: true }
    });
    if (cbs && cbs.suc) cbs.suc();
  } else {
    dispatch({ type: types.RECHARGE, payload: { isRecharging: false } });
    if (cbs && cbs.err) cbs.err(response.data);
  }
};
