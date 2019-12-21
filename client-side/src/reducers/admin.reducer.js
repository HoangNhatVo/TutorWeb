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
  currentContract: {
    isLoading: false,
    contractData: {},
    isOk: false
  },
  tags: {
    isLoading: false,
    tags: [],
    isOk: false,
    message: "",
    isAdding: false
  },
  contracts: {
    isGetting: false,
    isOk: false,
    contracts: ""
  }
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case types.RESET:
      return {
        ...initState
      };
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
    case types.IS_GETTING_CURRENT_CONTRACT:
      return {
        ...state,
        currentContract: {
          ...state.currentContract,
          isLoading: true
        }
      };
    case types.GET_CURRENT_CONTRACT_SUCCESSFULLY:
      return {
        ...state,
        currentContract: {
          ...state.currentContract,
          isLoading: false,
          isOk: true,
          contractData: payload
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
            if (tag.id === payload.id)
              return { ...tag, tentag: payload.tagnameupdate, updating: false };
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
    case types.IS_GETTING_CONTRACTS:
      return {
        ...state,
        contracts: {
          ...state.contracts,
          isGetting: true
        }
      };
    case types.GET_CONTRACTS_OK:
      return {
        ...state,
        contracts: {
          ...state.contracts,
          isGetting: false,
          isOk: true,
          contracts: payload
        }
      };
    default:
      return state;
  }
};
