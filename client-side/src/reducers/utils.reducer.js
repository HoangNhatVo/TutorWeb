import * as types from "../types";

const initState = {
  specializes: {
    isOk: false,
    specializes: [],
    message: ""
  }
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case types.RESET:
      return {
        ...initState
      };
    case types.GET_SPECIALIZES_OK:
      return {
        ...state,
        specializes: {
          isOk: true,
          specializes: payload.specializes,
          message: payload.message
        }
      };
    default:
      return state;
  }
};
