import {
  SEARCH_MUNICIPIOS,
  CLEAR_MUNICIPIOS,
  GET_MUNICIPIO,
  GET_WEATHER,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_MUNICIPIOS:
      return {
        ...state,
        municipios: action.payload,
      };
    case GET_MUNICIPIO:
      return {
        ...state,
        municipio: action.payload,
      };
    case CLEAR_MUNICIPIOS:
      return {
        ...state,
        municipios: [],
      };
    case GET_WEATHER: {
      return {
        ...state,
        weather: action.payload,
      };
    }

    default:
      return state;
  }
};
