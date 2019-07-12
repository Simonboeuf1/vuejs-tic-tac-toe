
<template>
  <span class="tile" :style="{top: x, left: y}">
    {{value}}
  </span>
</template>

<script>

import { setTimeout } from "timers";

export default {
  name: 'Tile',
  props: {
    value: {
      type: String,
      default: ''
    },
    x: {
      type: number,
      default: 0,
    },
    y: {
      type: number,
      default: 0
    }
  },
}

</script>

<style scoped>
  .tile {
    position: absolute;
  }
</style>
