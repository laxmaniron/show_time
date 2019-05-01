import axios from "axios";
import { GET_CITIES } from "./types";

import { createMessage, returnErrors } from "./messages";

//Get Cities

export const getCities = user_id => dispatch => {
  axios
    .get("/movies/api/movies/cities/")
    .then(res => {
      dispatch({
        type: GET_CITIES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// export const getSnacks = () => dispatch => {
//   axios
//     .get("/movies/api/movies/snacks/")
//     .then(res => {
//       dispatch({
//         type: GET_SNACKS,
//         payload: res.data
//       });
//     })
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };
