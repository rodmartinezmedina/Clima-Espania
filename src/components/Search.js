import "@elastic/eui/dist/eui_theme_light.css";
import "@babel/polyfill";
import axios from "axios";
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
  const {
    searchMunicipios,
    getMunicipio,
    municipios,
    isSelected,
  } = MunicipiosState;

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

  // trying to  GET CODIGOINE of chosen MUNICIPIO. DO NOT DELETE
  //with codigoine i should be able to call the second api adress for getting weather data
  //im getting the whole array. all undefined except the one that matches name. i get codigoine of that one.
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

  let codigoIneNoZeros = codigoineOfSelected.map((each) =>
    each.split("").splice(0, 5).join("")
  );

  const getWeatherOfMunicipio = async () => {
    const res = await axios.get(
      `https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/${codigoIneNoZeros}`
      // `https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/${municipio.CODIGOINE}`
      //CODIGOINE is in this REST API kind of the ID for each municipio.
      //I intent to use this later to get the weather conditions from each municipio.
    );
    console.log(res.data.municipio);
  };

  useEffect(() => {
    // Simulate initial load.
    onSearchChange("");
  }, [onSearchChange]);

  //FORM SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`selected options from submit`, selectedOptions);
    console.log(`codigoineOfSelected from submit`, codigoineOfSelected);
    console.log(`codigoIneNoZeros from submit`, codigoIneNoZeros);
    getWeatherOfMunicipio();
    // let weatherOfSelected = municipiosContext.getMunicipio();

    //HERE I SHOULD CALL GETMUNICIPIO SOMEHOW FOR GETTING WEATHER DATA FROM CHOSEN MUNICIPIO
  };

  //CONSOLE.LOGS
  // console.log(`municipiosFromContext`, municipiosFromContext);
  // console.log(`municipiosNames:`, municipiosNames);
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
      <MunicipioItem
        nombre={namesOfSelected}
        tempActual="insertar data real de api"
        lluvia="insertar data real de api"
      />
      {/* label={selectedOptions.label} */}
    </div>
  );
};

export default Search;
