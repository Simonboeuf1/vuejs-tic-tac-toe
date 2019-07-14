import {Players, BOARD_SIZE} from "../constants";

export const initPlayer = () => Players.Player1;

export const initTile = (x, y) => ({x, y, value: ''});

export const initTiles = () => {
  const indexes = Array(BOARD_SIZE).fill(null);
  return indexes
    .reduce((acc, _, x) => {
      indexes.forEach((_, y) => acc.push(initTile(x, y)));
      return acc;
    }, []);
}