import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  movies: moviesReducer,
  errors: errors,
  messages: messages
});
