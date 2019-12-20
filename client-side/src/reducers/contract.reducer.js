import * as types from "../types";

const initState = {
  contract: {
    isCreating: false,
    response: ""
  }
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case types.IS_CREATING_CONTRACT:
      return {
        ...state,
        contract: {
          ...state.contract,
          isCreating: true
        }
      };
    case types.CREATE_CONTRACT_OK:
      return {
        ...state,
        contract: {
          ...state.contract,
          isCreating: false,
          response: payload
        }
      };
    default:
      return state;
  }
};
