import { combineReducers } from "redux";
import utils from "./utils.reducer";
import auth from "./auth.reducer";
import admin from "./admin.reducer";
import teacher from "./teacher.reducer";

export default combineReducers({
  utils,
  auth,
  admin,
  teacher
});
