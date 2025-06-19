import React, { useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../assets/circle.png";
import cross_icon from "../assets/cross.png";

function Square({ value, onClick }) {
  return (
    <div className="boxes" onClick={onClick}>
      {value === "X" && <img src={cross_icon} alt="X" />}
      {value === "O" && <img src={circle_icon} alt="O" />}
    </div>
  );
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [tie, setTie] = useState(false);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    
    const newSquares = [...squares];
    newSquares[index] = xIsNext ? "X" : "O";
    
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const won = checkWin(newSquares);
    if (won) setWinner(won);
    
    if (!won && newSquares.every((square) => square !== null)) {
      setTie(true);
    }
    
  };

  console.log({tie, squares});
  

  const renderSquare = (num) => {
    return <Square value={squares[num]} onClick={() => handleClick(num)} />;
  };

  const checkWin = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setTie(false);
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe Game In <span>React</span>
      </h1>

      {winner ? (
        <div id="winnerArea" className="instructionsStyle">
          Congratulations!!! Winner is : <span>{winner}</span>
        </div>
      ) : 
      tie ? (
           <div id="winnerArea" className="instructionsStyle">
          Oops!!! It's a Tie<span>{winner}</span>
        </div>
        ) : (
        <div id="statusArea" className="instructionsStyle">
          Next player: <span>{xIsNext ? "X" : "O"}</span>
        </div>
      )}
      <div className="board">
        <div className="row1">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row2">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row3">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button
        className="reset"
        onClick={() => {
          resetGame();
        }}
      >
        Reset
      </button>
    </div>
  );
}
