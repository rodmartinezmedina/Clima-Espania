import React from "react";

const MunicipioItem = (props) => {
  //OPTION 2 RO PASS THE PROPS
  // const MunicipioItem = (props) => {
  // const { login, avatar_url, html_url } = props.user;

  return (
    <div>
      <h1>Title from MunicipioItem.js</h1>
      <h3> {props.label} </h3>
    </div>
  );
};

export default MunicipioItem;
