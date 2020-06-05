import "@elastic/eui/dist/eui_theme_light.css";
import "@babel/polyfill";
import { v4 as uuid } from "uuid";
import MunicipiosContext from "../contexts/municipiosContext";
import MunicipiosState from "../contexts/MunicipiosState";
import MunicipioCard from "../components/MunicipioCard";
import MunicipioItem from "./MunicipioItem";
import { EuiComboBox, EuiText, EuiButton } from "@elastic/eui";
import React, { useState, useEffect, useCallback, useContext } from "react";

// REST API ADRESS FORGETTING WEATHER INFO ABOUT EACH MUNICIPIO OF BARCELONA
// https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/[ID]
// 08= BARCELONA PROVINCE CODE IN API
// ID = CODIGOINE PROPERTY THAT EACH MUNICIPIO HAS

const Search = () => {
  const id = uuid.v4;
  //VARIABLES
  const municipiosContext = useContext(MunicipiosContext);
  const { searchMunicipios, municipios } = MunicipiosState;

  const municipiosFromContext = municipiosContext.municipios;

  let municipiosNames = municipiosFromContext.map((municipio) => {
    return { label: `${municipio.NOMBRE}` };
  });

  //FECTH DATA. ALL MUNICIPIOS
  useEffect(() => {
    return municipiosContext.searchMunicipios();
  }, []);

  //USESTATE
  const [selectedOptions, setSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  let searchTimeout;

  //FUNCTIONS -
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

  let namesOfSelected = selectedOptions.map((option) => {
    return option.label;
  });

  //THIS WORKS FOR GETTING CODIGOINE IF I CHOOSE ONLY ONE MUNICIPIO.
  // DO NOT DELETE
  //IF I CHOOSE 2 MUNICIPIOS IT DOESNT WORK.
  // LIMIT POSIBLE SELECTION TO 1 MUNICIPIO
  let codigoineOfSelected = municipiosFromContext.filter((municipio) => {
    return municipio.NOMBRE.includes(namesOfSelected);
  });

  // let codigoineOfSelected = municipiosFromContext.filter((municipio) => {
  //   let codigoineArr = [];
  //   namesOfSelected.map((name) => {
  //     if (municipio.NOMBRE.includes(name)) {
  //       codigoineArr.push(municipio.CODIGOINE, "aasdasda");
  //     }
  //   });
  // });

  useEffect(() => {
    // Simulate initial load.
    onSearchChange("");
  }, [onSearchChange]);

  //FORM SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`selected options from submit`, selectedOptions);

    // return (
    //   <div>
    //     {selectedOptions.map((option) => (
    //       <>
    //         {/* <MunicipioItem key={id} option={option.label} /> */}
    //         <p>zxdgszdfszgsz</p>
    //       </>
    //     ))}
    //   </div>
    // );
  };

  //CONSOLE.LOGS
  console.log(`municipiosFromContext`, municipiosFromContext);
  console.log(`municipiosNames:`, municipiosNames);
  console.log(`selectedOptions`, selectedOptions);
  console.log(`namesOfSelected`, namesOfSelected);
  console.log(`codigoineOfSelected`, codigoineOfSelected);
  //RENDER
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
      <form onSubmit={onSubmit} className="form text-center">
        <input
          type="submit"
          value="Mostrar Informacion meteorologica"
          className="btn btn-primary btn-block"
        />
      </form>
      {/* <EuiButton fill onClick={() => window.alert("Button clicked")}>
        Filled
      </EuiButton> */}

      <MunicipioItem label={selectedOptions.label} />
    </div>
  );
};

export default Search;
