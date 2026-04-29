<script setup lang="ts">
import { useCursorTrail } from '../composables/useCursorTrail';

const { cursorDots } = useCursorTrail();
</script>

<template>
  <div
    v-for="(dot, i) in cursorDots"
    :key="i"
    class="cursor-trail hidden md:block"
    :style="{
      transform: `translate3d(calc(${dot.x}px - 50%), calc(${dot.y}px - 50%), 0) scale(${(cursorDots.length - i) / cursorDots.length})`,
      opacity: ((cursorDots.length - i) / cursorDots.length) * 0.6,
    }"
  ></div>
</template>
