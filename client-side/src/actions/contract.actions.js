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

const isAccepttingContract = data => ({
  type: types.ACCEPTING_CONTRACT,
  payload: data
});

const acceptContractOk = data => ({
  type: types.ACCEPT_CONTRACT_OK,
  payload: data
});

const isEndingContract = data => ({
  type: types.ENDING_CONTRACT,
  payload: data
});

const endContractOk = data => ({
  type: types.END_CONTRACT_OK,
  payload: data
});

const isRejectingContract = data => ({
  type: types.REJECTING_CONTRACT,
  payload: data
});

const rejectContractOk = data => ({
  type: types.REJECT_CONTRACT_OK,
  payload: data
});

const payingContract = () => ({
  type: types.PAYING_CONTRACT
});

const payContractOk = data => ({
  type: types.PAY_CONTRACT_OK,
  payload: data
});

const isRatingContract = data => ({
  type: types.RATING_CONTRACT,
  payload: data
});

const rateContractOk = data => ({
  type: types.RATE_CONTRACT_OK,
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

export const rejectContract = idcontract => async dispatch => {
  dispatch(isRejectingContract(idcontract));

  const response = await api.post("/changestatuscontract", {
    idcontract,
    statusnew: "Đã từ chối"
  });

  if (response && response.data === "Thành công")
    dispatch(rejectContractOk(idcontract));
};

export const payContract = (hours, IDreciver, cbs) => async dispatch => {
  dispatch(payingContract());

  const response = await api.post("/payment", {
    hours,
    IDpayer: cookies.get("id"),
    IDreciver
  });

  dispatch(payContractOk(response.data));
  if (cbs.suc) cbs.sub();
};

export const acceptContract = idcontract => async dispatch => {
  dispatch(isAccepttingContract(idcontract));

  const response = await api.post("/changestatuscontract", {
    idcontract,
    statusnew: "Đã duyệt"
  });

  if (response && response.data === "Thành công")
    dispatch(acceptContractOk(idcontract));
};

export const endContract = idcontract => async dispatch => {
  dispatch(isEndingContract(idcontract));

  const response = await api.post("/changestatuscontract", {
    idcontract,
    statusnew: "Kết thúc"
  });

  if (response && response.data === "Thành công")
    dispatch(endContractOk(idcontract));
};

export const rateContract = (idcontract, cmt, score) => async dispatch => {
  dispatch(isRatingContract(idcontract));

  let r1 = null;

  if (cmt)
    r1 = await api.post("/addcmtcontract", {
      idcontract,
      cmt
    });

  if (score)
    await api.post("/addscorecontract", {
      idcontract,
      score
    });

  if (r1.data === "Thành công")
    dispatch(
      rateContractOk({ idcontract, CMTContract: cmt, ScoreContract: score })
    );
};

export const reclamationContract = (
  idnguoikhieunai,
  idhopdong,
  noidung
) => async dispatch => {
  dispatch({
    type: types.RECLAMATE_CONTRACT,
    payload: { isReclamating: true }
  });

  const response = await api.post("/addknhd", {
    idnguoikhieunai,
    idhopdong,
    noidung
  });

  if (response.data === "Thành công")
    dispatch({
      type: types.RECLAMATE_CONTRACT,
      payload: { noidung, isReclamating: false }
    });
};

export const chat = (idnguoinhan, noidung, idhd) => async dispatch => {
  dispatch({
    type: types.CHATTING,
    payload: { isChatting: true }
  });

  const response = await api.post(`/chat`, {
    idnguoigui: cookies.get("id"),
    idnguoinhan,
    noidung,
    idhd
  });

  dispatch({
    type: types.CHAT,
    payload: { ...response.data[0] }
  });
};
