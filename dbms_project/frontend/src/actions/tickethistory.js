import axios from "axios";
import { GET_TICKET_BOOKING_HISTORY } from "./types";

//Get Theatre Lists

export const getTicketHistory = user_id => dispatch => {
  axios
    .get(`/movies/api/history/${user_id}/`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_TICKET_BOOKING_HISTORY,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
