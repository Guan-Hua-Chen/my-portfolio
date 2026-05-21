<script setup lang="ts">
import { games } from '../../data/games';
import ProjectCard from '../ui/ProjectCard.vue';
</script>

<template>
  <section id="games" class="py-24 px-6 md:px-12 relative z-10">
    <div class="max-w-7xl mx-auto">
      <div
        class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal-on-scroll"
      >
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold italic text-orange-200">
          小游戏
        </h2>
        <button
          class="px-6 py-2 bg-transparent text-white font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 hover:scale-105 active:scale-95 border border-white/10 transition-all rounded-full hidden md:block"
        >
          查看所有游戏
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          v-for="(game, i) in games"
          :key="game.title + i"
          :project="game"
          :index="i"
        />
      </div>
    </div>
  </section>
</template>
