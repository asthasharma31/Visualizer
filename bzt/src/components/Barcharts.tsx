import "./styles.css";
import React from "react";
import {VictoryPie,VictoryLabel,VictoryBar,VictoryChart,VictoryAxis,VictoryTheme} from "victory";

export default function Barcharts(props:any) {

  return (
    <VictoryChart domainPadding={20} theme={VictoryTheme.material} height={200}>
    <VictoryAxis label={""} style={{tickLabels: {fontSize: 5, padding: 5},axisLabel: {fontSize: 5, padding: 20},}} />
    <VictoryAxis dependentAxis style={{tickLabels: {fontSize: 5, padding: 5}}}/>

    <VictoryBar animate barWidth={20} style={{data : {fill:"rgb(212, 0, 255)"}}}
     data={props.data} />
</VictoryChart>
  );
}
