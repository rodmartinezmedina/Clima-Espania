import "@elastic/eui/dist/eui_theme_light.css";
import "@babel/polyfill";
import axios from "axios";
import MunicipiosContext from "../contexts/municipiosContext";
import MunicipiosState from "../contexts/MunicipiosState";
import MunicipioCard from "./MunicipioCard";
import {
  EuiComboBox,
  EuiText,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageContent,
} from "@elastic/eui";
import React, { useState, useEffect, useCallback, useContext } from "react";
import municipiosContext from "../contexts/municipiosContext";
import "../App.css";

// REST API ADRESS FORGETTING WEATHER INFO ABOUT EACH MUNICIPIO OF BARCELONA
// https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/[ID]
// 08= BARCELONA PROVINCE CODE IN API
// ID = CODIGOINE PROPERTY THAT EACH MUNICIPIO HAS

// A TRABAJAR

const Search = () => {
  //CONTEXT
  const municipiosContext = useContext(MunicipiosContext);

  //USESTATE
  const [selectedOptions, setSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  let searchTimeout;

  //VARIABLES
  const {
    searchMunicipios,
    getMunicipio,
    municipios,
    municipio,
    isSelected,
  } = MunicipiosState;

  const municipiosFromContext = municipiosContext.municipios;
  const oneMunicipioFromContext = municipiosContext.municipio;

  let municipiosNames = municipiosFromContext.map((municipio) => {
    return { label: `${municipio.NOMBRE}` };
  });

  useEffect(() => {
    console.log(codigoIneNoZeros);
    municipiosContext.getMunicipio(codigoIneNoZeros);
  }, [selectedOptions]);

  //FECTH DATA. ALL MUNICIPIOS
  useEffect(() => {
    return municipiosContext.searchMunicipios();
  }, []);

  //FUNCTIONS
  // EUI ComboBox
  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const onSearchChange = useCallback(
    (searchValue) => {
      setLoading(true);
      setOptions([]);

      clearTimeout(searchTimeout);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      searchTimeout = setTimeout(() => {
        // Simulate a remotely-executed search.
        setLoading(false);
        setOptions(
          municipiosNames.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
      }, 200);
    },
    [municipiosFromContext]
  );

  //GETS NAME OF SELECTED MUNICIPIO
  let namesOfSelected = selectedOptions.map((option) => {
    return option.label;
  });

  // GET CODIGOINE of ALL MUNICIPIOS. DO NOT DELETE
  let allCodigoines = municipiosFromContext.map((municipio) => {
    let municipioCodigoine;
    if (municipio.NOMBRE.includes(namesOfSelected)) {
      municipioCodigoine = municipio.CODIGOINE;
      return municipioCodigoine;
    }
  });

  //GETS CODIGOINE OF SELECTED ELEMENT/S
  let codigoineOfSelected = allCodigoines.filter((codigoIne) => {
    return codigoIne !== undefined;
  });

  //BORRA LOS CEROS EXTRAS DEL CODIGO INE.
  let codigoIneNoZeros = codigoineOfSelected.map((each) =>
    each.split("").splice(0, 5).join("")
  );

  useEffect(() => {
    // Simulate initial load.
    onSearchChange("");
  }, [onSearchChange]);

  //RENDER
  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem>
        <EuiComboBox
          id="search-box"
          fullWidth="true"
          placeholder="Buscar Municipio..."
          async
          singleSelection
          options={options}
          selectedOptions={selectedOptions}
          isLoading={isLoading}
          onChange={onChange}
          onSearchChange={onSearchChange}
        />
      </EuiFlexItem>
      <EuiFlexItem id="combo-box">
        <MunicipioCard
          nombre={namesOfSelected}
          tempActual={oneMunicipioFromContext.temperatura_actual}
          lluvia={oneMunicipioFromContext.lluvia}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default Search;
