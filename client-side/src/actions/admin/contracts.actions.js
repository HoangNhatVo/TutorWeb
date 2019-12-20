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

  const sub = await api.get("/listcontract", {});

  dispatch(getContractOk(sub.data));
};
