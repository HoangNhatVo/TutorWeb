import * as types from "../types";
import api from "../utils/axios";

const getSpecializesOk = specializes => ({
  type: types.GET_SPECIALIZES_OK,
  payload: { specializes }
});

export const getSpecializes = () => async dispatch => {
  const specializes = await api.get("/chuyennganh");
  dispatch(getSpecializesOk(specializes && specializes.data));
};
