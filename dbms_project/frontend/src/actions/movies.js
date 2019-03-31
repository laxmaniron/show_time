import axios from "axios";
import { createMessage } from "./messages";

import { GET_MOVIES, GET_ERRORS } from "./types";

//GET_MOVIES

export const getMovies = () => dispatch => {
  axios
    .get("/movies/api/movies/")
    .then(res => {
      dispatch(createMessage({ movieLoad: "movies loaded successfully" }));
      dispatch({
        type: GET_MOVIES,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};
