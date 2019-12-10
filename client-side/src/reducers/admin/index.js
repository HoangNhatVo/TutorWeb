import * as types from "../../types";

const initState = {
  users: {
    isLoading: false,
    users: [],
    message: ""
  }
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case types.IS_GETTING_USERS:
      return {
        ...state,
        users: {
          isOk: payload,
          ...state.users
        }
      };
    case types.GET_USERS_SUCCESSFULLY:
      return {
        ...state,
        users: {
          isOk: false,
          users: payload
        }
      };
    default:
      return state;
  }
};
