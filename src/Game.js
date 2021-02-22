import React, { useCallback, useEffect, useState } from "react";

import Snake from "./snake/Snake";
import Food from "./food/Food";
import useIntervals from "./useIntervals";
import "./Game.css";

const randomFoodPosition = () => {
  const xCoordinate = 2 * Math.floor(Math.random() * 49);
  const yCoordinate = 2 * Math.floor(Math.random() * 49);
  return { x: xCoordinate, y: yCoordinate };
};

const Game = () => {
  const [snakeDots, setSnakeDots] = useState([
    { x: 0, y: 0 },
    { x: 2, y: 0 },
    { x: 4, y: 0 },
  ]);
  const [foodPostion, setFoodPostion] = useState(randomFoodPosition());
  const [snakeDirection, setSnakeDirection] = useState("right");
  const [speed, setSpeed] = useState(200);
  const [movedAfterDirecrionChange, setMovedAfterDirecrionChange] = useState(
    true
  );

  useEffect(() => {
    window.addEventListener("keydown", onkeydown());
    let interval = setInterval(() => {
      return snakeMovment();
    }, speed);

    return () => {
      window.removeEventListener("keydown", onkeydown());
      if (interval) clearInterval(interval);
    };
  });

  useEffect(() => {
    //check on movment of snake
    checkIfInGameBorders();
    checkForCollision();
    checkIfEating();
  }, [snakeDots]);

  onkeydown = (e) => {
    if (movedAfterDirecrionChange) {
      e = e || 39;
      switch (e.keyCode) {
        case 37:
          if (snakeDirection !== "right") {
            setSnakeDirection("left");
            setMovedAfterDirecrionChange(false);
          }
          break;
        case 38:
          if (snakeDirection !== "down") {
            setSnakeDirection("up");
            setMovedAfterDirecrionChange(false);
          }
          break;
        case 39:
          if (snakeDirection !== "left") {
            setSnakeDirection("right");
            setMovedAfterDirecrionChange(false);
          }
          break;
        case 40:
          if (snakeDirection !== "up") {
            setSnakeDirection("down");
            setMovedAfterDirecrionChange(false);
          }
          break;
      }
    }
  };

  const snakeMovment = () => {
    setMovedAfterDirecrionChange(true);
    let newSnakeDots = [...snakeDots];
    let snakeHeadXPosition = newSnakeDots[newSnakeDots.length - 1].x;
    let snakeHeadYPosition = newSnakeDots[newSnakeDots.length - 1].y;

    switch (snakeDirection) {
      case "up":
        snakeHeadYPosition = snakeHeadYPosition - 2;
        break;

      case "down":
        snakeHeadYPosition = snakeHeadYPosition + 2;
        break;

      case "left":
        snakeHeadXPosition = snakeHeadXPosition - 2;
        break;

      case "right":
        snakeHeadXPosition = snakeHeadXPosition + 2;
        break;
    }

    newSnakeDots.push({ x: snakeHeadXPosition, y: snakeHeadYPosition });
    newSnakeDots.shift();
    setSnakeDots(newSnakeDots);
  };

  const checkIfInGameBorders = () => {
    let snakeHeadPosition = snakeDots[snakeDots.length - 1];
    if (
      // out of boundaries
      snakeHeadPosition.x >= 100 ||
      snakeHeadPosition.x < 0 ||
      snakeHeadPosition.y >= 100 ||
      snakeHeadPosition.y < 0
    ) {
      GameOver();
    }
  };

  const checkForCollision = () => {
    let snakeForCheck = [...snakeDots];
    let snakeHeadPosition = snakeForCheck[snakeForCheck.length - 1];
    snakeForCheck.pop();
    snakeForCheck.forEach((snakedot) => {
      if (
        snakedot.x === snakeHeadPosition.x &&
        snakedot.y === snakeHeadPosition.y
      )
        GameOver();
    });
  };

  const GameOver = () => {
    alert(`Game Over.\nSnake length was ${snakeDots.length}\nGood Job `);
    setSnakeDots([
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 4, y: 0 },
    ]);
    setSpeed(200);
    setSnakeDirection("right");
    setFoodPostion(randomFoodPosition());
  };

  const checkIfEating = () => {
    snakeDots.forEach((snakedot) => {
      if (snakedot.x === foodPostion.x && snakedot.y === foodPostion.y) {
        setFoodPostion(randomFoodPosition());
        setSpeed((prevSpeed) => prevSpeed * 0.9);
        enlargeSnake();
        return;
      }
    });
  };

  const enlargeSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  return (
    <div className='game-area'>
      <Snake snakeDots={snakeDots} />
      <Food foodPostion={foodPostion} />
    </div>
  );
};

export default Game;
