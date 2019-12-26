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
  const dkhd = await api.get(`/dkhd/${id}`);
  const knhd = await api.get(`/knhd/${id}`);
  const chats = await api.get(`/getchat/${id}`);
  dispatch(
    getCurrentContractOk({
      ...contract.data[0],
      dkhd: dkhd.data,
      knhd: knhd.data,
      chats: chats.data
    })
  );
};

export const getAllReclamations = () => async dispatch => {
  dispatch({
    type: types.GET_ALL_RECLAMATE_CONTRACTS,
    payload: { isGetAllReclamations: true }
  });

  const response = await api.get("/allknhd");
  dispatch({
    type: types.GET_ALL_RECLAMATE_CONTRACTS,
    payload: {
      isGetAllReclamations: false,
      isGetAllReclamationsOk: true,
      allReclamations: response.data
    }
  });
};
