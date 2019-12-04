import { combineReducers } from "redux";
import utils from "./utils.reducer";
import auth from "./auth.reducer";

export default combineReducers({
  utils,
  auth
});
