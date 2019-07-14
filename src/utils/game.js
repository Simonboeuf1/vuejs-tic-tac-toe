import {Players} from "../constants";
import {getMarker, hasWinner, hasSpaceLeft} from "./board";


export const markTile = (board, tile, player) => {
  const marker = getMarker(player);
  const tileIndex = board.findIndex(t => t === tile);
  return [...board.slice(0, tileIndex), ...board.slice(tileIndex + 1, board.length), {...tile, value: marker}];
}

export const switchPlayer = (player) => player === Players.Player1 ? Players.Player2 : Players.Player1

export const isGameFinished = (board) => !hasSpaceLeft(board) || hasWinner(board);