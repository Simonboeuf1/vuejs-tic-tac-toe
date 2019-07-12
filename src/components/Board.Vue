
<template>
  <div class="board">
    foobar
  </div>
</template>

<script>

const BOARDSIZE = 3;

const Players = Object.freeze({
  Player1: 1,
  Player2: 2
});

const Markers = Object.freeze({
  Marker1: 'X',
  Marker2: 'O'
});

const mapPlayerToMarker = new Map([
    [Players.Player1, Markers.Marker1],
    [Players.Player2, Markers.Marker2]
]);

const initPlayer = () => Players.Player1;

const initTile = (x, y) => ({x, y, value: ''});

const initTiles = () => {
  const tiles = [];
  for(let x = 0; i < BOARDSIZE; i++) {
    for(let y = 0; j < BOARDSIZE; j++) {
      tiles.push(initTile(x, y));
    }
  }
  return tiles;
}

const initialPlayer = initPlayer();

const initialTiles = initTiles();

const getMarker = (player) => mapPlayerToMarker.get(player);

const isGameFinished = function() {
  return false;
}

export default {
  name: 'Board',
  data: () => ({
    currentPlayer: initialPlayer,
    tiles: initialTiles
  }),
  computed: function() {
    return {
      isGameFinished: isGameFinished()
    }
  },
  methods: () => ({
    switchPlayer: function() {
      this.currentPlayer = this.currentPlayer === Players.Player1 ? Players.Player2 : Players.Player1;
    },
    markTile: function(x, y) {
      const tile = this.tiles.find((tile) => tile.x === x && tile.y == y);
      const marker = getMarker(this.currentPlayer);
      tile.value = marker;
    }
  }),
  components: {
    Tile
  }
}

</script>

<style scoped>
  .tile {
    position: absolute;
  }
</style>
