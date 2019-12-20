import * as types from "../../types";
import api from "../../utils/axios";

const isGettingontract = () => ({
  type: types.IS_GETTING_CONTRACTS
});

const getContractOk = data => ({
  type: types.GET_CONTRACTS_OK,
  payload: data
});

export const getContracts = () => async dispatch => {
  dispatch(isGettingontract());

  const contracts = await api.get("/listcontract");
  console.log("view contracts", contracts);
  dispatch(getContractOk(contracts.data));
};
