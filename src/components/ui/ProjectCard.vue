<script setup lang="ts">
import type { Project } from '../../types';
import { useRouter } from 'vue-router';

const props = defineProps<{
  project: Project;
  index: number;
}>();

const currentYear = new Date().getFullYear();

const formatIndex = (i: number) => `0${i + 1}`;

const router = useRouter();

const handleClick = () => {
  if (props.project.link) {
    router.push(props.project.link);
  }
};
</script>

<template>
  <div
    class="glass-panel group cursor-pointer relative overflow-hidden rounded-2xl flex flex-col h-full reveal-on-scroll"
    :style="`transition-delay: ${index * 150}ms`"
    @click="handleClick"
  >
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
    ></div>

    <div
      class="h-44 md:h-48 relative p-6 transition-all duration-500 z-10 overflow-hidden"
      :class="
        project.gallery?.length
          ? ''
          : 'bg-gradient-to-br from-orange-500/10 group-hover:from-orange-500/20 to-transparent'
      "
    >
      <template v-if="project.gallery?.length">
        <div class="absolute inset-0 grid grid-cols-3 gap-px bg-white/10">
          <img
            v-for="(src, gi) in project.gallery"
            :key="gi"
            :src="src"
            :alt="`${project.title} 预览 ${gi + 1}`"
            class="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-transparent pointer-events-none"
        ></div>
      </template>
      <div
        class="absolute top-4 right-4 text-[10px] font-mono text-orange-400/70 group-hover:text-orange-400 transition-colors z-20"
      >
        作品 // {{ formatIndex(index) }}
      </div>
      <div
        class="mt-auto absolute bottom-6 left-6 right-6 transform transition-transform group-hover:translate-x-2 z-20"
      >
        <h3 class="text-2xl font-serif italic">{{ project.title }}</h3>
        <p class="text-xs font-bold tracking-widest text-[#f4f1ea] opacity-50 uppercase mt-1">
          {{ project.type }}
        </p>
      </div>
    </div>

    <div class="p-6 flex-1 bg-white/[0.02] flex flex-col justify-between space-y-6 z-10">
      <p class="text-xs leading-relaxed opacity-70 group-hover:opacity-90 transition-opacity">
        {{ project.desc }}
      </p>

      <div>
        <div class="flex flex-wrap gap-2 pt-4 mb-6">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="px-3 py-1 bg-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all rounded-full text-[11px] border border-white/10"
          >
            {{ tag }}
          </span>
        </div>
        <div class="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
          <span class="text-[10px] font-mono opacity-40 group-hover:opacity-60 transition-opacity">
            案例研究 {{ currentYear }}
          </span>
          <div
            class="w-10 h-10 rounded-full border border-orange-400 flex items-center justify-center text-orange-400 group-hover:bg-orange-400 group-hover:text-black group-hover:scale-110 transition-all duration-300"
          >
            →
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
