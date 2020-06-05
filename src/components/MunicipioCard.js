import React from "react";
import { EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import Search from "./Search";

const WeatherCard = () => {
  return (
    <div>
      <EuiFlexGroup gutterSize="l">
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            icon={<EuiIcon size="xl" type={"logoBeats"} />}
            title={"Nombre Municipio"}
            description="This card adds uses an 'xl' size icon which works well in a horizontal layout."
            onClick={() => window.alert("Card clicked")}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            icon={<EuiIcon size="l" type={"logoCloud"} />}
            titleSize="xs"
            title={"Nombre Municipio"}
            description="This card uses an 'l' size icon but also shrinks the 'titleSize' to 'xs'."
            onClick={() => window.alert("Card clicked")}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
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

export default WeatherCard;
