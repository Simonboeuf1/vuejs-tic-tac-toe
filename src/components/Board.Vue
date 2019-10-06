
<template>
  <div class="game">
    <h1>Current player : {{currentPlayerMarker}} </h1>
    <div class="board" :style="{width, height}">
      <Tile
        v-for="tile in board"
        :key="`x${tile.x}y${tile.y}`"
        :x="tile.x"
        :y="tile.y"
        :value="tile.value"
        @tileClick="play"
        />
    </div>
    <template v-if="isGameFinished">
      <h2>{{finishedText}}</h2>
      <button @click="initGame">New game</button>
    </template>
  </div>
</template>

<script>

import Tile from "./Tile.vue"
import {BOARD_SIZE, TILE_SIZE} from "../constants";
import {initPlayer, initTiles} from "../utils/init"
import {markTile, getNextPlayer} from "../utils/game"
import {isTileEmpty, hasWinner, getMarker, isGameFinished} from "../utils/board"

export default {
  name: 'Board',
  components: {
    Tile
  },
  data() {
    return {
      currentPlayer: initPlayer(),
      board: initTiles(),
      width: `${BOARD_SIZE * TILE_SIZE}px`,
      height: `${BOARD_SIZE * TILE_SIZE}px`,
    }
  },
  computed: {
    currentPlayerMarker() {
      return getMarker(this.currentPlayer);
    },
    isGameFinished() {
      return isGameFinished(this.board)
    },
    finishedText() {
      return hasWinner(this.board) ? `Player ${this.currentPlayer} won!` : 'Game drawn.'
    },
  },
  methods: {
    initGame() {
      this.currentPlayer = initPlayer();
      this.board = initTiles();
    },
    switchPlayer() {
      this.currentPlayer = getNextPlayer(this.currentPlayer);
    },
    play(tile) {
      if(!this.isGameFinished && isTileEmpty(tile)) {
        this.board = markTile(this.board, tile, this.currentPlayer);
        if(!this.isGameFinished) {
          this.switchPlayer();
        }
      }
    },
  }
}

</script>

<style scoped>
  .board {
    position: relative;
    margin: auto auto;
    user-select: none;
  }
  h2 {
    margin-bottom: 0;
  }
  button {
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid black;
    border-radius: 3px;
  }
</style>
