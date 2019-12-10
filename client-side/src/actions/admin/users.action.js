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

export const getAllUsers = () => async dispatch => {
  dispatch(isGettingUsers(true));

  const users = await api.get("/getallaccount");

  dispatch(getAllUsersOk(users && users.data));
};
