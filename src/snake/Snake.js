import React from "react";
import "./Snake.css";

const Snake = ({ snakeDots }) => {
  return (
    <>
      {snakeDots.map((snakeDot, i) => {
        const position = {
          left: `${snakeDot.x}%`,
          top: `${snakeDot.y}%`,
        };
        return <div className='snake-dot' style={position} key={i}></div>;
      })}
    </>
  );
};

export default Snake;
