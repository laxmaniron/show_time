import axios from "axios";
import { GET_SPECIFICMOVIE } from "./types";
import { createMessage, returnErrors } from "./messages";

//GET SPECIFIC MOVIE

export const getSpecificMovie = id => dispatch => {
  axios
    .get(`/movies/api/movies/${id}`)
    .then(res => {
      dispatch({
        type: GET_SPECIFICMOVIE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
