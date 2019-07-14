
<template>
  <div class="game">
    <div class="board" :style="{width, height}">
      <Tile 
        v-for="tile in board" 
        :key="`x${tile.x}y${tile.y}`" 
        :x="tile.x" 
        :y="tile.y" 
        :value="tile.value"
        v-on:play="({x, y}) => play(x, y)"
        />
    </div>
    <template v-if="finished">
      <h1>{{finishedText}}</h1>
      <button @click="initGame">New game</button>
    </template>
  </div>
</template>

<script>

import Tile from "./Tile.vue"
import {BOARD_SIZE, TILE_SIZE} from "../constants";
import {initPlayer, initTiles} from "../utils/init"
import {isGameFinished, markTile, switchPlayer} from "../utils/game"
import {findTile, isTileEmpty, hasWinner} from "../utils/board"

export default {
  name: 'Board',
  components: {
    Tile
  },
  data: () => ({
    currentPlayer: initPlayer(),
    board: initTiles(),
    width: `${BOARD_SIZE * TILE_SIZE}px`, // Pas moyen de faire mieux pour les constantes ? 
    height: `${BOARD_SIZE * TILE_SIZE}px`,
  }),
  computed: {
    finished: function() {
      return this.isGameFinished()
    },
    finishedText: function() {
      return hasWinner(this.board) ? `Player ${this.currentPlayer} won!` : 'Game drawn.'
    },
  },
  methods: {
    switchPlayer: function() {
      this.currentPlayer = switchPlayer(this.currentPlayer);
    },
    isGameFinished: function() {
      return isGameFinished(this.board);
    },
    initGame: function() {
      this.currentPlayer = initPlayer();
      this.board = initTiles();
    },
    play: function(x, y) {
      if(!this.finished) {
        const tile = findTile(this.board, x, y);
        if(isTileEmpty(tile)) {
          this.board = markTile(this.board, tile, this.currentPlayer);
          if(!this.isGameFinished()) {
            this.switchPlayer();
          }
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
</style>
