import {Players, Markers, BOARD_SIZE} from "../constants";

const mapPlayerToMarker = new Map([
  [Players.Player1, Markers.Marker1],
  [Players.Player2, Markers.Marker2]
]);

const isAllEq = (arr) => {
  if(arr.length === 0) {
    return false;
  }
  const firstValue = arr[0];
  return !arr.some(val => val !== firstValue);
}

const isFilledWithSameValue = (tiles) =>
  tiles.length === BOARD_SIZE && isAllEq(tiles.map(({value}) => value));

const checkLine = (tiles) => {
  const indexes = Array(BOARD_SIZE).fill(null);
  return indexes.some(
    (_, index) => isFilledWithSameValue(tiles.filter(tile => tile.number === index))
  )
}

const checkRows = (board) => checkLine(board.map(({x, value}) => ({number: x, value})));

const checkCols = (board) => checkLine(board.map(({y, value}) => ({number: y, value})));

const checkDiags = (board) => {
  const firstDiag = board.filter(tile => tile.x === tile.y);
  const secondDiag = board.filter(tile => tile.x + tile.y === BOARD_SIZE - 1);

  return isFilledWithSameValue(firstDiag) || isFilledWithSameValue(secondDiag);
}

export const hasWinner = (board) => {
  const filledTiles = board.filter(tile => tile.value.length !== 0)

  return checkRows(filledTiles) || checkCols(filledTiles) || checkDiags(filledTiles);
}

export const hasSpaceLeft = (board) => board.some(tile => tile.value.length === 0);

export const getMarker = (player) => mapPlayerToMarker.get(player);

export const isTileEmpty = ({value}) => value.length === 0;

export const isGameFinished = (board) => !hasSpaceLeft(board) || hasWinner(board);