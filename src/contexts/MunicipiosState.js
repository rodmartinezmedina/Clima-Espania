import React, { createContext, useReducer, Component } from "react";
import axios from "axios";
import MunicipiosContext from "./municipiosContext";
import MunicipiosReducer from "./municipiosReducer";
import {
  SEARCH_MUNICIPIOS,
  CLEAR_MUNICIPIOS,
  GET_MUNICIPIO,
  GET_WEATHER,
} from "./types";

const MunicipiosState = (props) => {
  const initialState = {
    municipios: [],
    municipio: {},
  };

  const [state, dispatch] = useReducer(MunicipiosReducer, initialState);
  //Search municipios
  //In arrow functions 'async' goes before the parameter.
  const searchMunicipios = async () => {
    const res = await axios.get(
      `https://www.el-tiempo.net/api/json/v2/provincias/08/municipios`
      // 08 means barcelona province. This should give me the list of all its municipios
    );

    dispatch({
      type: SEARCH_MUNICIPIOS,
      payload: res.data.municipios,
    });
  };

  //Get Municipio
  const getMunicipio = async (municipio) => {
    const res = await axios.get(
      `https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/${municipio.CODIGOINE}`
      //CODIGOINE is in this REST API kind of the ID for each municipio.
      //I intent to use this later to get the weather conditions from each municipio.
    );

    dispatch({ type: GET_MUNICIPIO, payload: res.municipio });
  };

  const dataMunicipiosArray = [searchMunicipios];

  //Clear Municipios
  const clearMunicipios = () => {
    dispatch({ type: CLEAR_MUNICIPIOS });
  };

  return (
    <MunicipiosContext.Provider
      value={{
        municipios: state.municipios,
        municipio: state.municipio,
        searchMunicipios,
        getMunicipio,
        clearMunicipios,
        dataMunicipiosArray,
      }}
    >
      {props.children}
    </MunicipiosContext.Provider>
  );
};

export default MunicipiosState;
