import * as types from "../types";
import api from "../utils/axios";
import cookies from "../utils/cookies";

const isGettingTeachers = () => ({
  type: types.IS_GETTING_TEACHERS
});

const gettingContract = () => ({
  type: types.IS_GETTING_MY_CONTRACT
});

const getTeachersOk = teachers => ({
  type: types.GET_TEACHERS_OK,
  payload: teachers
});

const getContractOk = contracts => ({
  type: types.GET_MY_CONTRACTS_OK,
  payload: contracts
});

export const getTeachers = (diadiem, tienday, tentag) => async dispatch => {
  dispatch(isGettingTeachers());
  let teachers = null;

  if (diadiem || tienday || tentag) {
    teachers = await api.post("/filterteacher", { diadiem, tienday, tentag });
  } else {
    teachers = await api.get("/allTeacher");
  }

  dispatch(getTeachersOk(teachers && teachers.data));
};

export const getCurrentContractList = () => async dispatch => {
  dispatch(gettingContract());
  const id = Number(cookies.get("id")),
    role = Number(cookies.get("role"));

  let url = "";
  if (role === 1) url = `/allcontractbystudent/${id}`;
  else if (role === 2) url = `/allcontractbyteacher/${id}`;
  const contract = await api.get(url);

  dispatch(getContractOk(contract.data));
};
