import React, { useState, useEffect, useCallback } from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import WeatherContext from "../contexts/WeatherContext";
import { EuiComboBox, EuiText } from "@elastic/eui";
// import { DisplayToggles } from "../form_controls/display_toggles";
// import { DisplayToggles } from "./display_toggles";
import "@babel/polyfill";
import "@elastic/eui/dist/eui_theme_light.css";
import WeatherContextProvider from "../contexts/WeatherContext";

const Search = () => {
  const allMunicipios = [
    {
      label: "santcugat",
    },
    { label: "barceloneta" },
  ];

  const [selectedMunicipios, setSelected] = useState([[]]);
  const [municipios, setMunicipios] = useState([]);
  let searchTimeout;
  const onChange = (selectedMunicipios) => {
    setSelected(selectedMunicipios);
  };

  const onSearchChange = useCallback((searchValue) => {
    setMunicipios([]);

    clearTimeout(searchTimeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    searchTimeout = setTimeout(() => {
      // Simulate a remotely-executed search.
      setMunicipios(
        allMunicipios.filter((municipio) =>
          municipio.label.toLowerCase().includes(searchValue.toLowerCase())
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
        placeholder="Select municipio"
        async
        municipios={municipios}
        selectedMunicipios={selectedMunicipios}
        onChange={onChange}
        onSearchChange={onSearchChange}
      />
    </div>
  );
};

export default Search;
