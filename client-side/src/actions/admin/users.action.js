import * as types from "../../types";
import api from "../../utils/axios";

const getAllUsersOk = users => ({
  type: types.GET_USERS_SUCCESSFULLY,
  payload: users
});

const isGettingUsers = value => ({
  type: types.IS_GETTING_USERS,
  payload: value
});

const getUserOk = users => ({
  type: types.GET_USER_SUCCESSFULLY,
  payload: users
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

export const getUser = id => async dispatch => {
  dispatch(isGettingUser(true));

  const user = await api.get(`/profile/${id}`);

  dispatch(getUserOk(user && user.data));
};
