import React from "react";

import Image from "../images/apple.jpg";
import "./Food.css";

const Food = ({ foodPostion }) => {
  const position = {
    left: `${foodPostion.x}%`,
    top: `${foodPostion.y}%`,
  };
  return <div className='food' style={position}></div>;
};

export default Food;
