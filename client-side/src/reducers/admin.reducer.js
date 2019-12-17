import * as types from "../types";

const initState = {
  users: {
    isLoading: false,
    users: [],
    message: ""
  },
  currentUser: {
    isLoading: false,
    userData: {}
  },
  tags: {
    isLoading: false,
    tags: [],
    isOk: false,
    message: "",
    isAdding: false
  }
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case types.IS_GETTING_USER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoading: true
        }
      };
    case types.GET_USER_SUCCESSFULLY:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoading: false,
          userData: payload
        }
      };
    case types.IS_GETTING_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          isOk: payload
        }
      };
    case types.GET_USERS_SUCCESSFULLY:
      return {
        ...state,
        users: {
          ...state.users,
          isOk: false,
          users: payload
        }
      };
    case types.IS_ADDING_TAG:
      return {
        ...state,
        tags: {
          ...state.tags,
          isAdding: true
        }
      };
    case types.ADD_TAG_SUCCESSFULLY:
      return {
        ...state,
        tags: {
          ...state.tags,
          isAdding: false,
          tags: [{ ...payload }].concat(
            typeof state.tags.tags === "object" ? state.tags.tags : []
          )
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
    case types.DELETE_TAG_SUCCESSFULLY:
      return {
        ...state,
        tags: {
          ...state.tags,
          tags: state.tags.tags.filter(tag => tag.id !== payload)
        }
      };
    case types.IS_DELETING_TAG:
      return {
        ...state,
        tags: {
          ...state.tags,
          tags: state.tags.tags.map(tag => {
            if (tag.id === payload) return { ...tag, deleting: true };
            else return tag;
          })
        }
      };
    case types.UPDATE_TAG_SUCCESSFULLY:
      return {
        ...state,
        tags: {
          ...state.tags,
          tags: state.tags.tags.map(tag => {
            if (tag.id === payload.id) return { ...payload };
            else return tag;
          })
        }
      };
    case types.UPDATE_TAG_FAILED:
      return {
        ...state,
        tags: {
          ...state.tags,
          tags: state.tags.tags.map(tag => {
            if (tag.id === payload) return { ...tag, updating: false };
            else return tag;
          })
        }
      };
    case types.IS_UPDATING_TAG:
      return {
        ...state,
        tags: {
          ...state.tags,
          tags: state.tags.tags.map(tag => {
            if (tag.id === payload) return { ...tag, updating: true };
            else return tag;
          })
        }
      };
    default:
      return state;
  }
};
