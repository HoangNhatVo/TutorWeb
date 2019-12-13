import * as types from "../types";

const initState = {
  signIn: { isSigningIn: false, message: "" },
  signUp: { isSigningUp: false, message: "" },
  userData: {
    isGetting: false,
    hoten: "",
    chuoixacthuc: "",
    avatar: "",
    vaitro: "",
    updatingDescription: false,
    updatingBasicInfo: false,
    updatingTags: false
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
    case types.IS_GETTING_PROFILE:
      return {
        ...state,
        userData: {
          ...state.userData,
          isGetting: true
        }
      };
    case types.GET_PROFILE_SUCCESSFULLY:
      return {
        ...state,
        userData: {
          ...payload,
          isGetting: false
        }
      };
    case types.UPDATING_DESCTIPTION:
      return {
        ...state,
        userData: {
          ...state.userData,
          updatingDescription: true
        }
      };
    case types.UPDATE_DESCTIPTION_RESPONSE:
      return {
        ...state,
        userData: {
          ...state.userData,
          updatingDescription: false,
          baigioithieu: payload
        }
      };
    case types.UPDATING_BASIC_INFO:
      return {
        ...state,
        userData: {
          ...state.userData,
          updatingBasicInfo: true
        }
      };
    case types.UPDATE_BASIC_INFO_RESPONSE:
      return {
        ...state,
        userData: {
          ...state.userData,
          updatingBasicInfo: false,
          ...payload
        }
      };
    default:
      return state;
  }
};
