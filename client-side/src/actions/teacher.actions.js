import * as types from "../types";
import api from "../utils/axios";

const isGettingTeachers = () => ({
  type: types.IS_GETTING_TEACHERS
});

const getTeachersOk = teachers => ({
  type: types.GET_TEACHERS_OK,
  payload: teachers
});

export const getTeachers = () => async dispatch => {
  dispatch(isGettingTeachers());

  const teachers = await api.get("/allTeacher");

  dispatch(getTeachersOk(teachers && teachers.data));
};
