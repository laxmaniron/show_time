import axios from "axios";
import { createMessage, returnErrors } from "./messages";

import { GET_MOVIES } from "./types";

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

      console.log("hi iam laxman ${res.data}");
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
