import React, { useState } from "react";
import {
  constants,
  fetchBoard,
  newGame,
  updateCellValue,
  checkForWinner,
} from "../api/index";

const style = {
  parentDiv: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    backgroundColor: "transparent",
    color: "whitesmoke",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  GameTitleDiv: {
    width: "100%",
    height: "15%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  boardDiv: {
    width: "100%",
    height: "80%",
    textAlign: "center",
  },
  newGameButton: {
    margin: "5% 35% 0 0",
  },
  winnerHeader: {
    with: "50%",
    margin: "5% 35% 0 0",
  },
  board: {
    width: "40%",
    height: "60%",
    margin: "5% 0 0 30%",
    border: "1px outset snow",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  cell: {
    flex: "1 1 30%",
    margin: "2px",
  },
  cellbutton: {
    width: "100%",
    height: "100%",
    fontSize: "100px",
    backgroundColor: "rgb(60, 62, 129)",
  },
};

export default function TicTacToe() {
  const [state, setState] = useState({
    totalMoves: 0,
    winner: null,
    isTie: false,
    playerOne: true,
    playerTwo: false,
    board: fetchBoard(),
  });

  const cells = () => {
    const board = state.board;
    let cellElements = [];
    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellId = [rowIndex, columnIndex];
        cellElements.push(
          <div id={(rowIndex, columnIndex)} className="cell" style={style.cell}>
            <button
              id={cellId}
              className={cell}
              style={style.cellbutton}
              onClick={handleCellUpdation}
              disabled={state.winner || cell != constants.initialCellValue}
            >
              {cell}
            </button>
          </div>
        );
      });
    });
    return cellElements;
  };

  const handleNewGame = () => {
    newGame();
    setState({
      totalMoves: 0,
      isTie: false,
      winner: null,
      playerOne: true,
      playerTwo: false,
      board: fetchBoard(),
    });
  };

  const handleCellUpdation = (event) => {
    try {
      const updateValue = state.playerOne ? "X" : "O";
      const cellIndex = event?.target?.id;
      const totalMoves = state.totalMoves + 1;
      let winner = false;
      updateCellValue(cellIndex, updateValue);
      if (totalMoves > 2) {
        winner = checkForWinner(cellIndex);
        if (winner) {
          winner = state.playerOne ? "Player One" : "Player Two";
        }
      }
      if (totalMoves >= constants.boardSize * constants.boardSize && !winner) {
        setState({
          ...state,
          winner,
          isTie: true,
          totalMoves,
          playerOne: !state.playerOne,
          playerTwo: !state.playerTwo,
        });
      } else {
        setState({
          ...state,
          winner,
          totalMoves,
          playerOne: !state.playerOne,
          playerTwo: !state.playerTwo,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="parentDiv" style={style.parentDiv}>
      <div className="GameTitleDiv" style={style.GameTitleDiv}>
        <h1>Let's Play TicTacToe</h1>
        <h3>{`${
          state.playerOne
            ? 'playerOne select the box to mark "X"'
            : 'playerTwo select the box to mark "O"'
        }`}</h3>
      </div>
      <div className="boardDiv" style={style.boardDiv}>
        <div className="boardTitleDiv">
          <button
            id="newGameButton"
            className="newGameButton"
            style={style.newGameButton}
            onClick={handleNewGame}
          >
            New Game
          </button>
        </div>
        <div className="board" style={style.board}>
          {cells()}
        </div>
        {state.winner && (
          <h2 id="winnerHeader" className="winnerHeader">
            {`Well Played, ${state.winner} wins this game !!`}
          </h2>
        )}
        {state.isTie && (
          <h2 id="tieHeader" className="tieHeader">
            {`Well Played, It's a Tie, lets start a new game !!`}
          </h2>
        )}
      </div>
    </div>
  );
}
