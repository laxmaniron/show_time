import { GET_SPECIFICMOVIE } from "../actions/types";

const initialState = {
  specificmovie: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SPECIFICMOVIE:
      return {
        ...state,
        specificmovie: action.payload
      };
    default:
      return state;
  }
}
