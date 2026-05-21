<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import GameBoard from './modules/GameBoard.vue';
import GameScore from './modules/GameScore.vue';
import GameControls from './modules/GameControls.vue';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = 'UP';
const GAME_SPEED = 150;

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type GameState = 'idle' | 'playing' | 'gameover';
type Position = { x: number; y: number };

const score = ref(0);
const highScore = ref(parseInt(localStorage.getItem('snakeHighScore') || '0', 10));
const gameState = ref<GameState>('idle');
const direction = ref<Direction>(INITIAL_DIRECTION);
const nextDirection = ref<Direction>(INITIAL_DIRECTION);
const snake = ref<Position[]>([...INITIAL_SNAKE]);
const food = ref<Position>({ x: 5, y: 5 });

let gameInterval: number | null = null;

const generateFood = () => {
  let newFood: Position;
  let isOccupied = true;
  while (isOccupied) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    isOccupied = snake.value.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    );
  }
  food.value = newFood!;
};

const startGame = () => {
  if (gameState.value === 'playing') return;
  snake.value = [...INITIAL_SNAKE];
  direction.value = INITIAL_DIRECTION;
  nextDirection.value = INITIAL_DIRECTION;
  score.value = 0;
  gameState.value = 'playing';
  generateFood();
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = window.setInterval(gameLoop, GAME_SPEED);
};

const gameOver = () => {
  gameState.value = 'gameover';
  if (gameInterval) clearInterval(gameInterval);
  if (score.value > highScore.value) {
    highScore.value = score.value;
    localStorage.setItem('snakeHighScore', highScore.value.toString());
  }
};

const gameLoop = () => {
  direction.value = nextDirection.value;
  const head = { ...snake.value[0] };

  switch (direction.value) {
    case 'UP':
      head.y -= 1;
      break;
    case 'DOWN':
      head.y += 1;
      break;
    case 'LEFT':
      head.x -= 1;
      break;
    case 'RIGHT':
      head.x += 1;
      break;
  }

  // Check collision with walls
  if (
    head.x < 0 ||
    head.x >= GRID_SIZE ||
    head.y < 0 ||
    head.y >= GRID_SIZE
  ) {
    gameOver();
    return;
  }

  // Check collision with self
  if (snake.value.some((segment) => segment.x === head.x && segment.y === head.y)) {
    gameOver();
    return;
  }

  snake.value.unshift(head);

  // Check food collision
  if (head.x === food.value.x && head.y === food.value.y) {
    score.value += 10;
    generateFood();
  } else {
    snake.value.pop();
  }
};

const changeDirection = (newDir: Direction) => {
  const opposites = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT',
  };
  if (opposites[newDir] !== direction.value) {
    nextDirection.value = newDir;
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Enter'].includes(e.key)) {
    e.preventDefault();
  }

  if (gameState.value !== 'playing') {
    if (e.key === ' ' || e.key === 'Enter') startGame();
    return;
  }

  switch (e.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      changeDirection('UP');
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      changeDirection('DOWN');
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      changeDirection('LEFT');
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      changeDirection('RIGHT');
      break;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  generateFood();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (gameInterval) clearInterval(gameInterval);
});
</script>

<template>
  <div class="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center justify-center relative z-10">
    <div class="max-w-2xl w-full">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-4xl md:text-5xl font-serif font-bold italic text-orange-200">
            贪吃蛇
          </h1>
          <p class="text-sm opacity-70 mt-2">经典怀旧游戏</p>
        </div>
        <GameScore :score="score" :high-score="highScore" />
      </div>

      <div class="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
        <div class="relative flex justify-center">
          <GameBoard
            :grid-size="GRID_SIZE"
            :snake="snake"
            :food="food"
          />

          <div
            v-if="gameState !== 'playing'"
            class="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center text-center z-20"
          >
            <h2 class="text-3xl font-bold text-white mb-4">
              {{ gameState === 'gameover' ? '游戏结束!' : '准备好了吗?' }}
            </h2>
            <p v-if="gameState === 'gameover'" class="text-orange-400 mb-6">
              最终得分: {{ score }}
            </p>
            <button
              @click="startGame"
              class="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
            >
              {{ gameState === 'gameover' ? '重新开始' : '开始游戏' }}
            </button>
            <p class="text-xs opacity-50 mt-4">
              按 空格键 或 回车键 开始
            </p>
          </div>
        </div>

        <GameControls @direction="changeDirection" />
      </div>
    </div>
  </div>
</template>
