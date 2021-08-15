import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import style from "./style";
import creators from "../creators/reducers/index";

export default combineReducers({
  errors,
  messages,
  auth,
  style,
  creators,
});
