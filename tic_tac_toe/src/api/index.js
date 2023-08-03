const _ = require("lodash");

export const constants = {
  initialCellValue: "-",
  boardSize: 3,
  board: [],
  diagonalCells: {
    3: [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  },
  antiDiagonalCells: {
    3: [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
  },
};

const checkWinnerForRows = (cellIndex) => {
  const row = constants.board[cellIndex[0]];
  return _.uniq(row)?.length == 1;
};

const checkWinnerForColumns = (cellIndex) => {
  const updatedValue = constants.board[cellIndex[0]][cellIndex[2]];
  const columnIndex = cellIndex[2];
  for (let rowIndex = 0; rowIndex < constants.boardSize; rowIndex++) {
    const value = constants.board[rowIndex][columnIndex];
    if (updatedValue !== value) {
      return false;
    }
  }
  return true;
};
const checkWinnerForDiagonal = (cellIndex) => {
  const { boardSize, diagonalCells, board } = constants;
  const updatedValue = board[cellIndex[0]][cellIndex[2]];
  let isWinner = true;
  diagonalCells[boardSize].forEach((indexArray) => {
    if (updatedValue != board[indexArray[0]][indexArray[1]]) {
      isWinner = false;
      return isWinner;
    }
  });
  return isWinner;
};
const checkWinnerForAntiDiagonal = (cellIndex) => {
  const { boardSize, antiDiagonalCells, board } = constants;
  const updatedValue = board[cellIndex[0]][cellIndex[2]];
  let isWinner = true;
  antiDiagonalCells[boardSize].forEach((indexArray) => {
    if (updatedValue != board[indexArray[0]][indexArray[1]]) {
      isWinner = false;
      return isWinner;
    }
  });
  return isWinner;
};

export const fetchBoard = () => {
  if (constants?.board?.length === 0) {
    constants.board = newGame();
  }
  return constants.board;
};

export const newGame = () => {
  let newBoard = [];
  for (let rowIndex = 0; rowIndex < constants.boardSize; rowIndex++) {
    let row = [];
    for (
      let columnIndex = 0;
      columnIndex < constants.boardSize;
      columnIndex++
    ) {
      row.push(constants.initialCellValue);
    }
    newBoard.push(row);
  }
  constants.board = newBoard;
  return newBoard;
};

export const updateCellValue = (cellIndex, value) => {
  constants.board[cellIndex[0]][cellIndex[2]] = value;
  return constants.board;
};

export const checkForWinner = (cellIndex) => {
  let iswinner = false;
  iswinner = checkWinnerForRows(cellIndex);
  if (!iswinner) iswinner = checkWinnerForColumns(cellIndex);
  if (!iswinner) iswinner = checkWinnerForDiagonal(cellIndex);
  if (!iswinner) iswinner = checkWinnerForAntiDiagonal(cellIndex);
  return iswinner;
};
