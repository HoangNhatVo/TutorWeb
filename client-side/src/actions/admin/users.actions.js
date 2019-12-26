import * as types from "../../types";
import api from "../../utils/axios";
import moment from "moment";

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
  const comments = await api.get(`/allcmtofteacher/${id}`);
  if (typeof user.data.user === "object") {
    const userData = user.data.user;

    dispatch(
      getUserOk({
        ...userData,
        tags: user.data.tag,
        comments: comments.data
      })
    );
  } else dispatch(getUserOk(user && user.data));
};

export const changeStatusUser = id => dispatch => {
  dispatch({ type: types.UPDATING_USER_STATUS, payload: id });
};

export const changeStatusUserOk = (id, newstatus) => dispatch => {
  dispatch({ type: types.UPDATE_USER_STATUS_OK, payload: { id, newstatus } });
};

// export const getIncomeTeacher = () => async dispatch => {
//   dispatch({
//     type: types.GET_INCOME_TEACHER,
//     payload: { isGetIncomeTeacher: true }
//   });

//   const response = await api.get(`/admin/Incometeacher/${cookies.get("id")}`);

//   dispatch({
//     type: types.GET_INCOME_TEACHER,
//     payload: {
//       isGetIncomeTeacher: false,
//       getIncomeTeacherOk: true,
//       data: response.data
//     }
//   });
// };

export const getTopIncomeByDay = date => async dispatch => {
  dispatch({
    type: types.GET_TOP_INCOME_BY_DAY,
    payload: { isGetTopIncomeByDay: true }
  });

  const response = await api.post(`/admin/TopIncomebyDay`, {
    date: moment(date).format("YYYY-MM-DD")
  });

  dispatch({
    type: types.GET_TOP_INCOME_BY_DAY,
    payload: {
      isGetTopIncomeByDay: false,
      getTopIncomeByDayOk: true,
      topIncomeByDay: response.data
    }
  });
};

export const getTopIncomeByWeek = (week, year) => async dispatch => {
  dispatch({
    type: types.GET_TOP_INCOME_BY_WEEK,
    payload: { isGetTopIncomebyWeek: true }
  });

  const response = await api.post(`/admin/TopincomebyWeek`, { week, year });

  dispatch({
    type: types.GET_TOP_INCOME_BY_WEEK,
    payload: {
      isGetTopIncomeByWeek: false,
      getTopIncomeByWeekOk: true,
      topIncomeByWeek: response.data
    }
  });
};

export const getTopIncomeByMonth = (month, year) => async dispatch => {
  dispatch({
    type: types.GET_TOP_INCOME_BY_MONTH,
    payload: { isGetTopIncomebyMonth: true }
  });

  const response = await api.post(`/admin/TopincomebyMonth`, { month, year });

  dispatch({
    type: types.GET_TOP_INCOME_BY_MONTH,
    payload: {
      isGetTopIncomeByMonth: false,
      getTopIncomeByMonthOk: true,
      topIncomeByMonth: response.data
    }
  });
};

export const getTopIncomeByQuarter = (quarter, year) => async dispatch => {
  dispatch({
    type: types.GET_TOP_INCOME_BY_QUARTER,
    payload: { isGetTopIncomebyQuarter: true }
  });

  const response = await api.post(`/admin/TopincomebyQuarter`, {
    quarter,
    year
  });

  dispatch({
    type: types.GET_TOP_INCOME_BY_QUARTER,
    payload: {
      isGetTopIncomeByQuarter: false,
      getTopIncomeByQuarterOk: true,
      topIncomeByQuarter: response.data
    }
  });
};

export const getTopAll = () => async dispatch => {
  dispatch({ type: types.GET_TOP_ALL, payload: { isGetTopAll: true } });

  const response = await api.post(`/admin/TopAll`);
  dispatch({
    type: types.GET_TOP_ALL,
    payload: { isGetTopAll: false, getTopAllOk: true, topAll: response.data }
  });
};
