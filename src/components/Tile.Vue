
<template>
  <span 
    @click="handleClick" 
    class="tile" 
    :style="{ top, left, width, height, fontSize }"
  >
    {{value}}
  </span>
</template>

<script>

import {TILE_SIZE} from "../constants";

export default {
  name: 'Tile',
  props: {
    value: String,
    x: Number,
    y: Number
  },
  data: function() {
    return {
      top: `${this.x * TILE_SIZE}px`,
      left: `${this.y * TILE_SIZE}px`,
      width: `${TILE_SIZE}px`,
      height: `${TILE_SIZE}px`,
      fontSize: `${TILE_SIZE}px`
    }
  },
  methods: {
    handleClick: function() {
      this.$emit('tileClick', {x: this.x, y: this.y})
    }
  }
}

</script>

<style scoped>
.tile {
  line-height: 1.1;
  position: absolute;
  border: 1px solid black;
}
</style>