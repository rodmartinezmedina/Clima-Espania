import "@babel/polyfill";
import "@elastic/eui/dist/eui_theme_light.css";
import { EuiText } from "@elastic/eui";
import React from "react";
import Home from "./components/Home";
import MunicipiosState from "./contexts/MunicipiosState";

import "./App.css";

function App() {
  return (
    <MunicipiosState>
      <div className="App">
        <Home />
      </div>
    </MunicipiosState>
  );
}

export default App;
