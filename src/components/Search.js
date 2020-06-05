import "@elastic/eui/dist/eui_theme_light.css";
import "@babel/polyfill";
import MunicipiosContext from "../contexts/municipiosContext";
import MunicipiosState from "../contexts/MunicipiosState";
import MunicipioCard from "../components/MunicipioCard";
import { EuiComboBox, EuiText } from "@elastic/eui";
import React, { useState, useEffect, useCallback, useContext } from "react";

const Search = () => {
  const municipiosContext = useContext(MunicipiosContext);
  const { searchMunicipios, municipios } = MunicipiosState;

  useEffect(() => {
    return municipiosContext.searchMunicipios();
  }, []);

  const municipiosFromContext = municipiosContext.municipios;

  let municipiosNames = municipiosFromContext.map((municipio) => {
    return { label: `${municipio.NOMBRE}` };
  });

  console.log(`municipiosFromContext`, municipiosFromContext);
  console.log(`municipiosNames:`, municipiosNames);

  const allMunicipios = [
    { label: "santcugat" },
    { label: "BARCELONETA" },
    { label: "BARCE" },
  ];

  const [selectedOptions, setSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  let searchTimeout;

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  // combo-box
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

  useEffect(() => {
    // Simulate initial load.
    onSearchChange("");
  }, [onSearchChange]);

  console.log(`selectedOptions`, selectedOptions);

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
      <button>Ver Clima del municipio seleccionado</button>
      <MunicipioCard description={`${selectedOptions}`} />
    </div>
  );
};

export default Search;
