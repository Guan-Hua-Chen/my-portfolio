<script setup lang="ts">
defineProps<{
  score: number;
  highScore: number;
}>();
</script>

<template>
  <div class="flex gap-4">
    <div class="glass-panel px-4 py-2 rounded-lg text-center min-w-[80px]">
      <p class="text-[10px] uppercase tracking-widest opacity-50 mb-1">分数</p>
      <p class="text-xl font-mono font-bold text-orange-400">{{ score }}</p>
    </div>
    <div class="glass-panel px-4 py-2 rounded-lg text-center min-w-[80px]">
      <p class="text-[10px] uppercase tracking-widest opacity-50 mb-1">最高分</p>
      <p class="text-xl font-mono font-bold">{{ highScore }}</p>
    </div>
  </div>
</template>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}
</style>
