import * as types from "../types";

const initState = {
  signIn: { isSigningIn: false, message: "" },
  signUp: { isSigningUp: false, message: "" },
  userData: {
    hoten: "",
    chuoixacthuc: "",
    avatar: "",
    vaitro: ""
  }
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case types.SIGNING_IN:
      return {
        ...state,
        signIn: {
          ...state.signIn,
          isSigningIn: true
        }
      };
    case types.SIGNING_UP:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          isSigningUp: true
        }
      };
    case types.SIGN_IN_RESPONSE:
      return {
        ...state,
        signIn: {
          message: payload,
          isSigningIn: false
        }
      };
    case types.SIGN_UP_RESPONSE:
      return {
        ...state,
        signUp: {
          message: payload,
          isSigningUp: false
        }
      };
    case types.SIGN_IN_SUCCESSFULLY:
      return {
        ...state,
        userData: {
          ...payload
        }
      };
    default:
      return state;
  }
};
