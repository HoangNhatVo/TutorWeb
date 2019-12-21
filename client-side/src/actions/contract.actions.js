import * as types from "../types";
import api from "../utils/axios";
import moment from "moment";
import cookies from "../utils/cookies";
import history from "../utils/history";

const isCreatingContract = () => ({
  type: types.IS_CREATING_CONTRACT
});

const createContractOk = data => ({
  type: types.CREATE_CONTRACT_OK,
  payload: data
});

export const createContract = (
  tenhopdong,
  idnguoiday,
  thoigianky,
  rules
) => async dispatch => {
  dispatch(isCreatingContract());

  const sub = await api.post("/createcontract", {
    tenhopdong,
    idnguoiday,
    idnguoihoc: cookies.get("id"),
    thoigianky: moment(thoigianky).format("DD/MM/YYYY")
  });

  rules.map(async rule => {
    await api.post("/adddkhd", {
      idhd: sub.data[0].id,
      noidung: rule.content,
      benthuchien: rule.actor
    });
  });

  dispatch(createContractOk(sub));
  history.push("/student");
};
