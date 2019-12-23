import * as types from "../../types";
import api from "../../utils/axios";

const getAllUsersOk = users => ({
  type: types.GET_USERS_SUCCESSFULLY,
  payload: users
});

const getUserOk = users => ({
  type: types.GET_USER_SUCCESSFULLY,
  payload: users
});

const isGettingAdmins = () => ({
  type: types.IS_GETTING_ADMINS
});

const getAllAdminsOk = users => ({
  type: types.GET_ADMINS_OK,
  payload: users
});
const isGettingUsers = value => ({
  type: types.IS_GETTING_USERS,
  payload: value
});

const isGettingUser = value => ({
  type: types.IS_GETTING_USER,
  payload: value
});

export const getAllUsers = () => async dispatch => {
  dispatch(isGettingUsers(true));

  const users = await api.get("/getallaccount");

  dispatch(getAllUsersOk(users && users.data));
};

export const getAllAdmins = () => async dispatch => {
  dispatch(isGettingAdmins());

  const users = await api.get("/alladmin");

  dispatch(getAllAdminsOk(users && users.data));
};

export const getUser = id => async dispatch => {
  dispatch(isGettingUser(true));

  const user = await api.get(`/profile/${id}`);
  if (typeof user.data.user === "object")
    dispatch(getUserOk(user && user.data.user));
  else dispatch(getUserOk(user && user.data));
};

export const changeStatusUser = id => dispatch => {
  dispatch({ type: types.UPDATING_USER_STATUS, payload: id });
};

export const changeStatusUserOk = (id, newstatus) => dispatch => {
  dispatch({ type: types.UPDATE_USER_STATUS_OK, payload: { id, newstatus } });
};
