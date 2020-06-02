import React, { createContext, useReducer, Component } from "react";
import axios from "axios";
import WeatherReducer from "./WeatherReducer";
import {
  SEARCH_MUNICIPIOS,
  CLEAR_MUNICIPIOS,
  GET_MUNICIPIO,
  GET_WEATHER,
} from "./types";

export const WeatherContext = createContext();

const WeatherContextProvider = (props) => {
  const initialState = {
    municipios: [],
    municipio: {},
  };

  const [state, dispatch] = useReducer(WeatherReducer, initialState);
  //Search municipios
  //In arrow functions 'async' goes before the parameter.
  const searchMunicipios = async (text) => {
    const res = await axios.get(
      `https://www.el-tiempo.net/api/json/v2/provincias/08/municipios`
    );

    //res.data.items because that's the way data comes from API
    dispatch({
      type: SEARCH_MUNICIPIOS,
      payload: res.municipios,
    });
  };

  //Get Municipio
  const getMunicipio = async (municipio) => {
    const res = await axios.get(
      `https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/${municipio.CODIGOINE}`
    );

    dispatch({ type: GET_MUNICIPIO, payload: res.municipio });
  };

  //Clear Municipios
  const clearMunicipios = () => {
    dispatch({ type: CLEAR_MUNICIPIOS });
  };

  return (
    <WeatherContext.Provider
      value={{
        municipios: state.municipios,
        municipio: state.municipio,
        searchMunicipios,
        getMunicipio,
        clearMunicipios,
      }}
    >
      {this.props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
