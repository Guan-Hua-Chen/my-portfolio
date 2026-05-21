<script setup lang="ts">
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-vue-next';

defineEmits<{
  (e: 'direction', dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'): void;
}>();
</script>

<template>
  <div class="mt-8 flex flex-col items-center gap-2 md:hidden">
    <button
      @click="$emit('direction', 'UP')"
      class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white active:scale-95 transition-all"
      aria-label="向上"
    >
      <ArrowUp :size="24" />
    </button>
    <div class="flex gap-2">
      <button
        @click="$emit('direction', 'LEFT')"
        class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white active:scale-95 transition-all"
        aria-label="向左"
      >
        <ArrowLeft :size="24" />
      </button>
      <button
        @click="$emit('direction', 'DOWN')"
        class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white active:scale-95 transition-all"
        aria-label="向下"
      >
        <ArrowDown :size="24" />
      </button>
      <button
        @click="$emit('direction', 'RIGHT')"
        class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white active:scale-95 transition-all"
        aria-label="向右"
      >
        <ArrowRight :size="24" />
      </button>
    </div>
  </div>
  
  <div class="mt-6 text-center text-xs opacity-50 hidden md:block">
    使用键盘 <kbd class="px-2 py-1 bg-white/10 rounded">W</kbd>
    <kbd class="px-2 py-1 bg-white/10 rounded">A</kbd>
    <kbd class="px-2 py-1 bg-white/10 rounded">S</kbd>
    <kbd class="px-2 py-1 bg-white/10 rounded">D</kbd> 或方向键控制移动
  </div>
</template>

