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
    case types.ENDING_CONTRACT:
      return {
        ...state,
        myContracts: {
          ...state.myContracts,
          contracts: state.myContracts.contracts.map(contract => {
            if (contract.IDContract === payload)
              return { ...contract, isEnding: true };
            else return contract;
          })
        }
      };
    case types.END_CONTRACT_OK:
      return {
        ...state,
        myContracts: {
          ...state.myContracts,
          contracts: state.myContracts.contracts.map(contract => {
            if (contract.IDContract === payload)
              return { ...contract, StatusContract: "Kết thúc" };
            else return contract;
          })
        }
      };
    case types.ACCEPTING_CONTRACT:
      return {
        ...state,
        myContracts: {
          ...state.myContracts,
          contracts: state.myContracts.contracts.map(contract => {
            if (contract.IDContract === payload)
              return { ...contract, isAccepting: true };
            else return contract;
          })
        }
      };
    case types.ACCEPT_CONTRACT_OK:
      return {
        ...state,
        myContracts: {
          ...state.myContracts,
          contracts: state.myContracts.contracts.map(contract => {
            if (contract.IDContract === payload)
              return { ...contract, StatusContract: "Đã duyệt" };
            else return contract;
          })
        }
      };
    case types.REJECTING_CONTRACT:
      return {
        ...state,
        myContracts: {
          ...state.myContracts,
          contracts: state.myContracts.contracts.map(contract => {
            if (contract.IDContract === payload)
              return { ...contract, isRejecting: true };
            else return contract;
          })
        }
      };
    case types.REJECT_CONTRACT_OK:
      return {
        ...state,
        myContracts: {
          ...state.myContracts,
          contracts: state.myContracts.contracts.map(contract => {
            if (contract.IDContract === payload)
              return { ...contract, StatusContract: "Đã từ chối" };
            else return contract;
          })
        }
      };

    // case types.PAYING_CONTRACT:
    //   return {
    //     ...state,
    //     contracts: {
    //       ...state.contracts,
    //       isGetting: true
    //     }
    //   };
    // case types.PAY_CONTRACT_OK:
    //   return {
    //     ...state,
    //     contracts: {
    //       ...state.contracts,
    //       isGetting: false,
    //       isOk: true,
    //       contracts: payload
    //     }
    //   };
    default:
      return state;
  }
};
