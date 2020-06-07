import "@elastic/eui/dist/eui_theme_light.css";
import "@babel/polyfill";
import MunicipiosContext from "../contexts/municipiosContext";
import MunicipiosState from "../contexts/MunicipiosState";
import MunicipioCard from "./MunicipioCard";
import { EuiComboBox, EuiText, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import React, { useState, useEffect, useCallback, useContext } from "react";
import "../App.css";

const Search = () => {
  //CONTEXT
  const municipiosContext = useContext(MunicipiosContext);

  //USE STATE
  const [selectedOptions, setSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  //VARIABLES
  let searchTimeout;

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

  //USE EFFECTS
  useEffect(() => {
    console.log(codigoineOfSelected);
    municipiosContext.getMunicipio(codigoineOfSelected);
  }, [selectedOptions]);

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
  let nameOfSelected = selectedOptions.map((option) => {
    return option.label;
  });

  // GETS CODIGOINE of ALL MUNICIPIOS. SPLICED (API DOESN'T RECOGNIZE CODIGOINE WITH ZEROS)
  let allCodigoines = municipiosFromContext.map((municipio) => {
    let municipioCodigoine;
    if (municipio.NOMBRE.includes(nameOfSelected)) {
      municipioCodigoine = municipio.CODIGOINE;
      return municipioCodigoine.split("").splice(0, 5).join("");
    }
  });

  //GETS CODIGOINE OF SELECTED ELEMENT
  let codigoineOfSelected = allCodigoines.filter((codigoIne) => {
    return codigoIne !== undefined;
  });

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
      <EuiFlexItem id="municipio-card">
        <MunicipioCard
          nombre={nameOfSelected}
          tempActual={oneMunicipioFromContext.temperatura_actual}
          lluvia={oneMunicipioFromContext.lluvia}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default Search;
