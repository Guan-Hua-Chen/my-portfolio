<script setup lang="ts">
import { posts } from '../../data/posts';
import BlogPostItem from '../ui/BlogPostItem.vue';
</script>

<template>
  <section id="blog" class="py-32 px-6 md:px-12">
    <div
      class="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-2xl reveal-on-scroll relative overflow-hidden group"
    >
      <div
        class="absolute inset-0 bg-gradient-to-br from-orange-400/0 via-transparent to-orange-400/5 group-hover:to-orange-400/10 transition-colors duration-700 pointer-events-none"
      ></div>

      <h3 class="text-[10px] uppercase tracking-widest text-orange-400 font-bold mb-8 relative z-10">
        最近学习
      </h3>

      <div class="space-y-0 relative z-10">
        <BlogPostItem v-for="post in posts" :key="post.title" :post="post" />
      </div>

      <div class="mt-8 text-center md:text-left relative z-10">
        <button
          class="px-6 py-2 bg-transparent text-white font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 border border-white/10 transition-all rounded-full hover:scale-105 active:scale-95"
        >
          探索日志
        </button>
      </div>
    </div>
  </section>
</template>
