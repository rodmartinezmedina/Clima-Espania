import React, { useState } from "react";
import { EuiText, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
// import { DisplayToggles } from "../form_controls/display_toggles";
import "@babel/polyfill";
import "@elastic/eui/dist/eui_theme_light.css";
import Search from "./Search";

const Home = () => {
  return (
    <div className="home-container">
      <EuiFlexGroup justifyContent="center" direction="column">
        <EuiFlexItem id="home-header">
          <EuiText>
            <h1>CLIMA EN BARCELONA</h1>
            <h2>Por favor seleccione un municipio</h2>
          </EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <Search />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
};

export default Home;
