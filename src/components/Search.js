import "@elastic/eui/dist/eui_theme_light.css";
import "@babel/polyfill";
import axios from "axios";
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
  //VARIABLES
  const municipiosContext = useContext(MunicipiosContext);

  const {
    searchMunicipios,
    getMunicipio,
    municipios,
    isSelected,
  } = MunicipiosState;

  const municipiosFromContext = municipiosContext.municipios;
  const oneMunicipioFromContext = municipiosContext.municipio;

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

  //BORRA LOS CEROS EXTRAS DEL CODIGO INE. SI UNO INGRESA EL NUMERO TAL COMO ES LA API NO LO RECIBE
  let codigoIneNoZeros = codigoineOfSelected.map((each) =>
    each.split("").splice(0, 5).join("")
  );

  let oneMunicipioWeather;

  //GET MUNICIPIO FUNCTION
  // municipiosContext.getMunicipio({namesOfSelected}.{codigoineOfSelected});

  // WORKAROUND GET WEATHER OF MUNICIPIO
  const getWeatherOfMunicipio = async (municipio) => {
    const res = await axios.get(
      `https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/${codigoIneNoZeros}`
      // `https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/${municipio.CODIGOINE}`
    );
    oneMunicipioWeather = res.data;
    console.log(`getWeatherOfMunicipio(). selected municipio data`, res.data);
    return res.data;
  };

  useEffect(() => {
    // Simulate initial load.
    onSearchChange("");
  }, [onSearchChange]);

  // useEffect(() => {
  //   // Simulate initial load.
  //   console.log(
  //     `municipiosContext.getMunicipio()`,
  //     municipiosContext.getMunicipio()
  //   );
  // }, [onChange]);

  //FORM SUBMIT
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`selected options from submit`, selectedOptions);
    console.log(`codigoineOfSelected from submit`, codigoineOfSelected);
    console.log(`codigoIneNoZeros from submit`, codigoIneNoZeros);
    console.log(
      `oneMunicipioFromContext from submit`,
      oneMunicipioFromContext.municipio
    );
    getWeatherOfMunicipio();
    console.log(`oneMunicipioWeather`, oneMunicipioWeather);
    // municipiosContext.getMunicipio(namesOfSelected.codigoineOfSelected);
    // console.log(namesOfSelected.codigoineOfSelected);
  };

  //CONSOLE.LOGS
  console.log(`selectedOptions`, selectedOptions);
  console.log(`namesOfSelected`, namesOfSelected);
  console.log(`codigoineOfSelected`, codigoineOfSelected);
  console.log(`oneMunicipioWeather`, oneMunicipioWeather);

  // {(oneMunicipioWeather !== undefined)  ? ( {const { temperatura_actual, lluvia } = oneMunicipioWeather}) : (console.log('hiiiiiiiiii'))}
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

      <MunicipioItem
        nombre={namesOfSelected}
        tempActual={
          oneMunicipioWeather === undefined
            ? "todavia esta undefined"
            : `${municipiosContext.municipio.temperatura_actual}`
        }
        // tempActual="insertar data real de api"
        lluvia="insertar data real de api"
      />
      {/* label={selectedOptions.label} */}
    </div>
  );
};

export default Search;
