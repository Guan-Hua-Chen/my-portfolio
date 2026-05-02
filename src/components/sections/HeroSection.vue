<script setup lang="ts">
import { Github } from 'lucide-vue-next';
import avatarImg from '@/src/assets/avator.jpg';

const emit = defineEmits<{
  (e: 'navigate', id: string): void;
}>();
</script>

<template>
  <section
    id="home"
    class="min-h-screen flex flex-col justify-center relative px-6 md:px-12 pt-20"
  >
    <div class="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-12 items-center">
      <div class="flex-1 animate-fade-in-up md:text-left text-center z-10 w-full reveal-on-scroll">
        <span
          class="inline-block text-orange-400 font-semibold text-sm tracking-widest uppercase mb-4"
        >
          前端开发 & AI探索者
        </span>
        <h1
          class="text-6xl md:text-[90px] lg:text-[110px] leading-[0.85] font-serif font-bold italic mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-400"
        >
          个人<br />开发者
        </h1>
        <p
          class="max-w-md mx-auto md:mx-0 text-lg text-orange-100 opacity-60 leading-relaxed font-light mb-8"
        >
          在代码与创意的交汇处，编织无缝的全栈网页体验。
        </p>
        <div class="flex items-center justify-center md:justify-start gap-6">
          <button
            @click="emit('navigate', 'projects')"
            class="px-8 py-4 bg-orange-400 text-black font-bold uppercase text-xs tracking-widest hover:bg-orange-300 transition-all rounded-full hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
          >
            查看作品集
          </button>
          <div class="h-[1px] w-12 bg-white/20 hidden md:block transition-all hover:w-16"></div>
          <a
            href="https://github.com"
            target="_blank"
            class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-60 hover:opacity-100 hover:scale-110 hover:border-orange-400 hover:text-orange-400 transition-all"
          >
            <Github class="w-5 h-5" />
          </a>
        </div>
      </div>

      <div
        class="flex-1 hidden md:flex justify-center items-center relative animate-fade-in-up"
        style="animation-delay: 0.2s"
      >
        <div class="relative w-[300px] h-[400px]">
          <div
            class="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-[30px] -rotate-6 transform scale-105 blur-sm z-0 transition-transform duration-500 hover:rotate-[-8deg]"
          ></div>

          <div
            class="absolute inset-0 rounded-2xl overflow-hidden glass-panel border border-white/10 z-10 transform rotate-3 transition-all duration-500 hover:rotate-1 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,157,92,0.2)]"
          >
            <img
              :src="avatarImg"
              alt="个人开发者头像"
              class="w-full h-full object-cover opacity-90 transition-all duration-700 hover:scale-105"
            />
          </div>

          <div
            class="absolute -bottom-8 -left-12 w-40 h-40 rounded-2xl overflow-hidden glass-panel border border-white/10 z-20 transform -rotate-6 transition-all duration-500 hover:rotate-0 hover:scale-110 shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop"
              alt="Code"
              class="w-full h-full object-cover opacity-80"
            />
          </div>

          <div
            class="absolute -top-6 -right-8 w-32 h-32 rounded-full overflow-hidden glass-panel border border-white/10 z-20 transform rotate-12 transition-all duration-500 hover:rotate-0 hover:scale-110 shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1627398246734-d8db5b8eb580?q=80&w=1470&auto=format&fit=crop"
              alt="Hardware"
              class="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute bottom-10 right-6 md:right-12 gap-4 opacity-50 hidden sm:flex animate-bounce"
    >
      <div class="vertical-text text-[10px] tracking-widest uppercase font-mono">向下滚动</div>
    </div>
  </section>
</template>
