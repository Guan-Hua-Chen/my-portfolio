<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  gridSize: number;
  snake: { x: number; y: number }[];
  food: { x: number; y: number };
}>();

const boardStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.gridSize}, minmax(0, 1fr))`,
  gridTemplateRows: `repeat(${props.gridSize}, minmax(0, 1fr))`,
  width: '100%',
  aspectRatio: '1 / 1',
  maxWidth: '400px',
}));

const isSnakeSegment = (x: number, y: number) => {
  return props.snake.some((segment) => segment.x === x && segment.y === y);
};

const isSnakeHead = (x: number, y: number) => {
  return props.snake[0]?.x === x && props.snake[0]?.y === y;
};

const isFood = (x: number, y: number) => {
  return props.food.x === x && props.food.y === y;
};
</script>

<template>
  <div
    class="bg-[#1a1a1a] rounded-xl border-2 border-white/10 overflow-hidden relative"
    :style="boardStyle"
  >
    <template v-for="y in gridSize" :key="`row-${y}`">
      <div
        v-for="x in gridSize"
        :key="`cell-${x}-${y}`"
        class="border border-white/[0.02]"
        :class="{
          'bg-orange-500 rounded-sm scale-95': isSnakeHead(x - 1, y - 1),
          'bg-orange-400/80 rounded-sm scale-90': isSnakeSegment(x - 1, y - 1) && !isSnakeHead(x - 1, y - 1),
          'bg-green-500 rounded-full scale-75 animate-pulse': isFood(x - 1, y - 1),
        }"
      ></div>
    </template>
  </div>
</template>
