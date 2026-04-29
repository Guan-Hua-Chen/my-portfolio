<script setup lang="ts">
import { BookOpen } from 'lucide-vue-next';
import type { Post } from '../../types';

defineProps<{
  post: Post;
}>();
</script>

<template>
  <div
    class="group/post cursor-pointer py-6 border-b border-white/5 last:border-0 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-500 hover:border-orange-400/30"
  >
    <div class="space-y-2 transform transition-transform duration-300 group-hover/post:translate-x-2">
      <span class="text-[10px] font-mono opacity-40 block">
        {{ post.date }} &nbsp;&bull;&nbsp; {{ post.readTime }}
      </span>
      <h4 class="text-lg md:text-xl font-semibold group-hover/post:text-orange-400 transition-colors">
        {{ post.title }}
      </h4>
    </div>
    <div
      class="w-8 h-8 rounded-full border border-white/10 items-center justify-center group-hover/post:border-orange-400 group-hover/post:bg-orange-400 group-hover/post:text-black transition-all opacity-30 group-hover/post:opacity-100 duration-300 hidden md:flex"
    >
      <BookOpen class="w-3 h-3 group-hover/post:scale-110 transition-transform" />
    </div>
  </div>
</template>
