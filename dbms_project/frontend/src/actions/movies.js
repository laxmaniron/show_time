import axios from "axios";

import { GET_MOVIES } from "./types";

//GET_MOVIES

export const getMovies = () => dispatch => {
  axios
    .get("/movies/api/movies/")
    .then(res => {
      dispatch({
        type: GET_MOVIES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
