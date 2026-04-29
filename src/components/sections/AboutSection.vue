<script setup lang="ts">
import { ref } from 'vue';
import { Code2, Database } from 'lucide-vue-next';
import { useTagCloud } from '../../composables/useTagCloud';
import { skillIconsHTML, frontendSkills, backendSkills } from '../../data/skills';
import SkillTagList from '../ui/SkillTagList.vue';

const tagCloudRef = ref<HTMLElement | null>(null);

useTagCloud({
  containerRef: tagCloudRef,
  texts: skillIconsHTML,
});
</script>

<template>
  <section id="about" class="min-h-screen flex items-center py-24 px-6 md:px-12 relative">
    <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div class="space-y-8 reveal-on-scroll">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold italic text-orange-200">
          关于我
        </h2>
        <div class="space-y-6 opacity-60 font-light leading-relaxed md:text-lg">
          <p>我是一名大三学生，也是一名充满热情的前端开发者。我致力于构建直观、美观且响应迅速的用户界面。</p>
          <p>
            我具备扎实的前端基础，熟练掌握 Vue 等现代框架。同时，我也在积极学习 Python 和 FastAPI 等后端技术，探索 AI 全栈开发的无限可能。
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-6 pt-8 border-t border-white/5">
          <div
            class="space-y-2 flex-1 glass-panel p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300"
          >
            <Code2 class="w-8 h-8 text-orange-400 mb-2" />
            <h3 class="text-[10px] uppercase tracking-widest text-orange-400 font-bold mb-4">
              前端技术
            </h3>
            <SkillTagList :tags="frontendSkills" />
          </div>
          <div
            class="space-y-2 flex-1 glass-panel p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300 delay-100"
          >
            <Database class="w-8 h-8 text-orange-400 mb-2" />
            <h3 class="text-[10px] uppercase tracking-widest text-orange-400 font-bold mb-4">
              后端技术
            </h3>
            <SkillTagList :tags="backendSkills" />
          </div>
        </div>
      </div>

      <div
        class="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden glass-panel flex items-center justify-center group flex-col text-center px-6 reveal-on-scroll delay-200"
      >
        <div
          class="absolute inset-0 bg-gradient-to-tr from-orange-400/5 to-transparent z-0 transition-opacity duration-500 group-hover:opacity-75"
        ></div>
        <div
          ref="tagCloudRef"
          class="tagcloud-wrapper z-10 w-full h-full flex items-center justify-center"
        ></div>
      </div>
    </div>
  </section>
</template>
