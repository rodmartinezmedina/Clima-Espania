import React from "react";
import { EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import Search from "./Search";

const MunicipioCard = () => {
  return (
    <div>
      <EuiFlexGroup gutterSize="l">
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            titleSize="s"
            title={"Nombre Municipio"}
            description="Example of a card's description. Stick to one or two sentences."
            onClick={() => window.alert("Card clicked")}
            href="#"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
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
