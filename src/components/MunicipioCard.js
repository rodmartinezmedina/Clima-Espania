import React from "react";
import { EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { euiPaletteColorBlindBehindText } from "@elastic/eui/lib/services";
const visColorsBehindText = euiPaletteColorBlindBehindText();

const MunicipioCard = (props) => {
  return (
    <>
      <EuiFlexGroup gutterSize="l">
        <EuiFlexItem>
          <EuiCard
            id="municipio-card"
            layout="vertical"
            icon={<EuiIcon size="l" type={"cloudSunny"} id="weather-icon" />}
            titleSize="xs"
            title={<h2>Municipio: {props.nombre}</h2>}
            description={
              <>
                <p>Temperatura Actual: {props.tempActual} °C</p>
                <p>Probabilidades de lluvia: {props.lluvia} %</p>
              </>
            }
            // onClick={() => window.alert("Card clicked")}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};

export default MunicipioCard;
