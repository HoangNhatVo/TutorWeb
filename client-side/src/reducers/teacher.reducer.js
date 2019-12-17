import * as types from "../types";

const initState = {
  teachers: {
    isLoading: false,
    isOk: false,
    teachers: []
  }
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case types.IS_GETTING_TEACHERS:
      return {
        ...state,
        teachers: {
          isLoading: true
        }
      };
    case types.GET_TEACHERS_OK:
      return {
        ...state,
        teachers: {
          isLoading: false,
          isOk: true,
          teachers: payload
        }
      };
    default:
      return state;
  }
};
