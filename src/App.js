import "@babel/polyfill";
import "@elastic/eui/dist/eui_theme_light.css";
import { EuiText } from "@elastic/eui";
import React from "react";
import Home from "./components/Home";

import "./App.css";

function App() {
  return (
    <div className="App">
      <EuiText>
        <h1>App Component h1</h1>
      </EuiText>

      <Home />
    </div>
  );
}

export default App;
