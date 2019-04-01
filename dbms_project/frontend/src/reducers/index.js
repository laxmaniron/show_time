import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";

export default combineReducers({
  movies: moviesReducer,
  errors: errors,
  messages: messages,
  auth: auth
});
