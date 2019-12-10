import { combineReducers } from "redux";
import utils from "./utils.reducer";
import auth from "./auth.reducer";
import admin from "./admin";

export default combineReducers({
  utils,
  auth,
  admin
});
