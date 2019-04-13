import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import specificmovieReducer from "./specificmovieReducer.js";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import userprofile from "./userprofile";
import genres from "./genres";
import languages from "./languages";
import formats from "./formats";
import snacks from "./snacks";

export default combineReducers({
  movies: moviesReducer,
  errors: errors,
  messages: messages,
  auth: auth,
  specificmovie: specificmovieReducer,
  userprofile: userprofile,
  genres: genres,
  languages: languages,
  formats: formats,
  snacks: snacks
});
