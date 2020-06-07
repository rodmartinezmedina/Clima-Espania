import React from "react";
import { EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import Search from "./Search";

const MunicipioCard = (props) => {
  return (
    <EuiFlexGroup gutterSize="l">
      <EuiFlexItem>
        <EuiCard
          layout="vertical"
          icon={<EuiIcon size="l" type={"cloudSunny"} />}
          titleSize="xs"
          title={<h2>Municipio: {props.nombre}</h2>}
          description={
            <>
              <p>Temperatura Actual: {props.tempActual} °C</p>
              <p>Probabilidades de lluvia:{props.lluvia} %</p>
            </>
          }
          // onClick={() => window.alert("Card clicked")}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default MunicipioCard;

{
  // BACKUPCARD;
  /* <EuiFlexItem>
<EuiCard
  layout="horizontal"
  titleSize="s"
  title={"Nombre Municipio"}
  description="Example of a card's description. Stick to one or two sentences."
  onClick={() => window.alert("Card clicked")}
  href="#"
/>
</EuiFlexItem> */
}
