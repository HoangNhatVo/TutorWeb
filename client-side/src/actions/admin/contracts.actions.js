import * as types from "../../types";
import api from "../../utils/axios";

const isGettingContract = () => ({
  type: types.IS_GETTING_CONTRACTS
});

const getContractOk = data => ({
  type: types.GET_CONTRACTS_OK,
  payload: data
});

const isGettingCurrentContract = () => ({
  type: types.IS_GETTING_CURRENT_CONTRACT
});

const getCurrentContractOk = data => ({
  type: types.GET_CURRENT_CONTRACT_SUCCESSFULLY,
  payload: data
});

export const getContracts = () => async dispatch => {
  dispatch(isGettingContract());

  const contracts = await api.get("/listcontract");
  dispatch(getContractOk(contracts.data));
};

export const getCurrentContract = id => async dispatch => {
  dispatch(isGettingCurrentContract());

  const contract = await api.get(`/contract/${id}`);

  dispatch(getCurrentContractOk(contract.data[0]));
};
