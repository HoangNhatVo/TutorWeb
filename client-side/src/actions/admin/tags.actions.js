import * as types from "../../types";
import api from "../../utils/axios";

const isDeletingTag = idTag => ({
  type: types.IS_DELETING_TAG,
  payload: idTag
});

const deleteTagOk = idTag => ({
  type: types.DELETE_TAG_SUCCESSFULLY,
  payload: idTag
});

const isUpdatingTag = idTag => ({
  type: types.IS_UPDATING_TAG,
  payload: idTag
});

const updateTagFailed = idTag => ({
  type: types.UPDATE_TAG_FAILED,
  payload: idTag
});

const updateTagOk = (id, tagnameupdate) => ({
  type: types.UPDATE_TAG_SUCCESSFULLY,
  payload: {
    id,
    tagnameupdate
  }
});

const getTagsOk = tags => ({
  type: types.GET_TAGS_OK,
  payload: { tags }
});

const addingTag = () => ({
  type: types.IS_ADDING_TAG
});

const addTagOk = (id, tentag) => ({
  type: types.ADD_TAG_SUCCESSFULLY,
  payload: { id, tentag: `#${tentag}` }
});

export const getTags = () => async dispatch => {
  const tags = await api.get("/alltag");
  dispatch(getTagsOk(tags && tags.data));
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

export const addTag = tagname => async dispatch => {
  dispatch(addingTag());

  const response = await api.post("/addtag", { tagname });

  if (response.data) dispatch(addTagOk(response.data, tagname));
};
