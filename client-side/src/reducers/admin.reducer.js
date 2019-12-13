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
    message: ""
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
    case types.IS_GETTING_TAGS:
      return {
        ...state,
        tags: {
          ...state.tags,
          isOk: payload
        }
      };
    case types.GET_TAGS_SUCCESSFULLY:
      return {
        ...state,
        tags: {
          ...state.tags,
          isOk: false,
          tags: payload
        }
      };
    case types.DELETE_TAGS_SUCCESSFULLY:
      return {
        ...state,
        tags: {
          ...state.tags,
          tags: state.tags.tags.filter(tag => tag.id !== payload)
        }
      };
    case types.IS_DELETING_TAGS:
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
    case types.UPDATE_TAGS_SUCCESSFULLY:
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
    case types.UPDATE_TAGS_FAILED:
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
    case types.IS_UPDATING_TAGS:
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
