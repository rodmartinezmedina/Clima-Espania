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
        <h1>Hello from Home component</h1>
        <h2>Por favor seleccione una ciudad</h2>
      </EuiText>
      <Search />

      <WeatherCard />
    </div>
  );
};

export default Home;
