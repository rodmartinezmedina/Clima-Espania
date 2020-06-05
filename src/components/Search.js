import "@elastic/eui/dist/eui_theme_light.css";
import "@babel/polyfill";
import MunicipiosContext from "../contexts/municipiosContext";
import MunicipiosState from "../contexts/MunicipiosState";
import { EuiComboBox, EuiText } from "@elastic/eui";
import React, { useState, useEffect, useCallback, useContext } from "react";

const Search = () => {
  const municipiosContext = useContext(MunicipiosContext);
  const { searchMunicipios, municipios } = MunicipiosState;

  useEffect(() => {
    return municipiosContext.searchMunicipios();
  }, []);

  const municipiosFromContext = municipiosContext.municipios;
  const bringOneMunicipio = municipiosContext.municipios[0];

  // let municipiosNames = municipiosFromContext.map((municipio) => {
  //   return `label: ${municipio.NOMBRE}`;
  // });
  // const municipiosNamesArr = [municipiosNames[0]];

  let municipiosNamesCopy = municipiosFromContext.map((municipio) => {
    return { label: municipio.NOMBRE };
  });

  console.log(`municipiosFromContext`, municipiosFromContext);
  console.log(`const bringOneMunicipio:`, bringOneMunicipio);
  console.log(`municipiosNamesCopy:`, municipiosNamesCopy);

  const allMunicipios = [
    { label: "santcugat" },
    { label: "BARCELONETA" },
    { label: "BARCE" },
    { label: "NETA" },
    { label: "TA" },
    { label: "BARCELONA" },
    { label: "BAdalona" },
  ];

  const [selectedOptions, setSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  let searchTimeout;

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  // combo-box
  const onSearchChange = useCallback((searchValue) => {
    setLoading(true);
    setOptions([]);

    clearTimeout(searchTimeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    searchTimeout = setTimeout(() => {
      // Simulate a remotely-executed search.
      setLoading(false);
      setOptions(
        municipiosNamesCopy.filter((option) =>
          option.label.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }, 1200);
  }, []);

  useEffect(() => {
    // Simulate initial load.
    onSearchChange("");
  }, [onSearchChange]);

  return (
    <div>
      <EuiComboBox
        placeholder="Search asynchronously"
        async
        options={options}
        selectedOptions={selectedOptions}
        isLoading={isLoading}
        onChange={onChange}
        onSearchChange={onSearchChange}
      />
      <button>Lista de municipios</button>
    </div>
  );
};

export default Search;
