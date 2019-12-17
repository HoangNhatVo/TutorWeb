import * as types from "../../types";
import api from "../../utils/axios";

const getAllTagsOk = tags => ({
  type: types.GET_TAGS_SUCCESSFULLY,
  payload: tags
});

const isGettingTags = value => ({
  type: types.IS_GETTING_TAGS,
  payload: value
});

const isDeletingTag = idTag => ({
  type: types.IS_DELETING_TAGS,
  payload: idTag
});

const deleteTagOk = idTag => ({
  type: types.DELETE_TAGS_SUCCESSFULLY,
  payload: idTag
});

const isUpdatingTag = idTag => ({
  type: types.IS_UPDATING_TAGS,
  payload: idTag
});

const updateTagFailed = idTag => ({
  type: types.UPDATE_TAGS_FAILED,
  payload: idTag
});

const updateTagOk = (id, tagnameupdate) => ({
  type: types.UPDATE_TAGS_SUCCESSFULLY,
  payload: {
    id,
    tagnameupdate
  }
});

export const getAllTags = () => async dispatch => {
  dispatch(isGettingTags(true));

  const tags = await api.get("/alltag");

  dispatch(getAllTagsOk(tags && tags.data));
};

export const deleteTag = id => async dispatch => {
  dispatch(isDeletingTag(id));

  const response = await api.post("/deletetag", { id });

  if (response.data === "Thành công") dispatch(deleteTagOk(id));
};

export const updateTag = (id, tagnameupdate) => async dispatch => {
  dispatch(isUpdatingTag(id));

  const response = await api.post("/updatetagname", { id, tagnameupdate });

  if (response.data === "Thành công") dispatch(updateTagOk(id, tagnameupdate));
  else dispatch(updateTagFailed(id));
};
