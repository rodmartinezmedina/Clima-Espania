import React, { useState } from "react";
import WeatherContext from "../contexts/WeatherContext";
import { EuiComboBox, EuiText } from "@elastic/eui";
import { DisplayToggles } from "../form_controls/display_toggles";
import "@babel/polyfill";
import "@elastic/eui/dist/eui_theme_light.css";
import WeatherContextProvider from "../contexts/WeatherContext";

const Search = () => {
  const municipios = [
    {
      label: "santcugat",
    },
    { label: "barceloneta" },
  ];

  const [selectedMunicipios, setSelected] = useState([municipios[0]]);

  const onChange = (selectedMunicipios) => {
    setSelected(selectedMunicipios);
  };

  return (
    <div>
      <DisplayToggles
        canDisabled={false}
        canReadOnly={false}
        canLoading={false}
        canPrepend
        canAppend
      >
        <EuiComboBox
          placeholder="Select municipio"
          singleSelection={{ asPlainText: true }}
          municipios={municipios}
          selectedMunicipios={selectedMunicipios}
          onChange={onChange}
          isClearable={false}
        />
      </DisplayToggles>
    </div>
  );
};

export default Search;
