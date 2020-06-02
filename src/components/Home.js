import React, { useState } from "react";
import { EuiComboBox, EuiText } from "@elastic/eui";
// import { DisplayToggles } from "../form_controls/display_toggles";
import "@babel/polyfill";
import "@elastic/eui/dist/eui_theme_light.css";
import Search from "./Search";
import WeatherCard from "./WeatherCard";

const Home = () => {
  return (
    <div>
      <EuiText grow={false}>
        <h1>Clima en la provincia de Barcelona</h1>
        <h2>Por favor seleccione un municipio</h2>
      </EuiText>
      <Search />

      <WeatherCard />
    </div>
  );
};

export default Home;
