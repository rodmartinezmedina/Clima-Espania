import React from "react";

const MunicipioItem = (props) => {
  //OPTION 2 RO PASS THE PROPS
  // const MunicipioItem = (props) => {
  // const { login, avatar_url, html_url } = props.user;

  return (
    <div>
      <h1>Nombre de municipio: {props.nombre}</h1>
      <h2> Temperatura Actual: {props.tempActual}</h2>
      <h2>Probabilidades de lluvia: {props.lluvia}</h2>
    </div>
  );
};

export default MunicipioItem;
