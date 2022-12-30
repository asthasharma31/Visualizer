import "./styles.css";
import React from "react";
import {VictoryPie,VictoryLabel} from "victory";

export default function Charts(props:any) {
  //console.log(props)
  return (
    <div className="d-flex flex-column">
    <div className="p-2"></div>
    <VictoryPie 
    //size={7}
    labelComponent={<VictoryLabel style={{ fontSize: 4 }} angle={45}  />}
     radius={30}
     colorScale={["tomato", "orange", "gold", "cyan", "navy","Blue", "Red","Yellow" ]}
      data={props.data}
      />
      </div>
  );
}
