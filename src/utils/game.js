import {Players} from "../constants";
import {getMarker} from "./board";


export const markTile = (board, tile, player) => {
  const marker = getMarker(player);
  const tileIndex = board.findIndex(t => t.x === tile.x && t.y === tile.y);
  const newTile = {...tile, value: marker};
  const boardWithoutTile = [...board.slice(0, tileIndex), ...board.slice(tileIndex + 1)];

  return [...boardWithoutTile, newTile];
}

export const getNextPlayer = (player) => player === Players.Player1 ? Players.Player2 : Players.Player1