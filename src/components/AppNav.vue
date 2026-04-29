<script setup lang="ts">
import { navSections } from '../data/skills';

defineProps<{
  activeSection: string;
  showBackground: boolean;
}>();

const emit = defineEmits<{
  (e: 'navigate', id: string): void;
}>();

const onNavigate = (id: string) => emit('navigate', id);
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 h-20 w-full flex items-center justify-between px-6 md:px-12 transition-all duration-500"
    :class="
      showBackground
        ? 'bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50'
        : 'bg-transparent border-transparent'
    "
  >
    <div
      class="text-2xl font-serif italic tracking-tighter cursor-pointer hover:text-orange-300 transition-colors"
      @click="onNavigate('home')"
    >
      Hgcheni.
    </div>

    <div
      class="md:hidden text-[#f4f1ea] uppercase text-xs tracking-widest menu-btn cursor-pointer active:text-orange-400 transition-colors"
    >
      菜单
    </div>

    <div class="hidden md:flex gap-8 text-xs uppercase tracking-widest font-semibold opacity-60">
      <button
        v-for="section in navSections"
        :key="section.id"
        @click="onNavigate(section.id)"
        :class="{
          'opacity-100 border-b border-orange-400': activeSection === section.id,
        }"
        class="hover:opacity-100 transition-all hover:-translate-y-0.5 pb-1"
      >
        {{ section.label }}
      </button>
    </div>
  </nav>
</template>
