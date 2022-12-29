// import "./styles.css";
import React from "react";
import {VictoryPie} from "victory";

export default function Charts(props:any) {

  console.log(props)

  return (
    <VictoryPie
      data={props.data}
  />
  );
}
