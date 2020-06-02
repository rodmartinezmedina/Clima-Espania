import React, { useState } from "react";
import WeatherContext from "../contexts/WeatherContext";
import { EuiComboBox, EuiText } from "@elastic/eui";
// import { DisplayToggles } from "../form_controls/display_toggles";
import "@babel/polyfill";
import "@elastic/eui/dist/eui_theme_light.css";

const Search = () => {
  const options = [
    {
      label: "Titan",
      "data-test-subj": "titanOption",
    },
    {
      label: "Enceladus is disabled",
      disabled: true,
    },
    {
      label: "Mimas",
    },
    {
      label: "Dione",
    },
    {
      label: "Iapetus",
    },
    {
      label: "Phoebe",
    },
    {
      label: "Rhea",
    },
    {
      label:
        "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    },
    {
      label: "Tethys",
    },
    {
      label: "Hyperion",
    },
  ];

  const [selectedOptions, setSelected] = useState([options[2]]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const onCreateOption = (searchValue, flattenedOptions = []) => {
    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        (option) => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      options.push(newOption);
    }

    // Select the option.
    setSelected([...selectedOptions, newOption]);
  };
  return (
    <div>
      <EuiComboBox
        placeholder="Select or create options"
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChange}
        onCreateOption={onCreateOption}
        isClearable={true}
        data-test-subj="demoComboBox"
      />
    </div>
  );
};

export default Search;
