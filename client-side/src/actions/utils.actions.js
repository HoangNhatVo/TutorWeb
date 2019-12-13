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

const getTagsOk = tags => ({
  type: types.GET_TAGS_OK,
  payload: { tags }
});

export const getTags = () => async dispatch => {
  const tags = await api.get("/alltag");
  dispatch(getTagsOk(tags && tags.data));
};
