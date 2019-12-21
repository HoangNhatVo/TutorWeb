import * as types from "../types";

const initState = {
  teachers: {
    isLoading: false,
    isOk: false,
    teachers: []
  },
  myContracts: {
    isLoading: false,
    isOk: false,
    contracts: []
  }
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case types.RESET:
      return {
        ...initState
      };
    case types.IS_GETTING_TEACHERS:
      return {
        ...state,
        teachers: {
          ...state.teachers,
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
    case types.IS_GETTING_MY_CONTRACT:
      return {
        ...state,
        myContracts: {
          ...state.myContracts,
          isLoading: true
        }
      };
    case types.GET_MY_CONTRACTS_OK:
      return {
        ...state,
        myContracts: {
          ...state.myContracts,
          isLoading: false,
          isOk: true,
          contracts: payload
        }
      };
    default:
      return state;
  }
};
