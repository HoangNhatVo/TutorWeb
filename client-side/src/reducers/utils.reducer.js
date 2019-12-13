import * as types from "../types";

const initState = {
  specializes: {
    isOk: false,
    specializes: [],
    message: ""
  },
  tags: {
    isOk: false,
    tags: [],
    message: ""
  }
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case types.GET_SPECIALIZES_OK:
      return {
        ...state,
        specializes: {
          isOk: true,
          specializes: payload.specializes,
          message: payload.message
        }
      };
    case types.GET_TAGS_OK:
      return {
        ...state,
        tags: {
          isOk: true,
          tags: payload.tags,
          message: payload.message
        }
      };
    default:
      return state;
  }
};
