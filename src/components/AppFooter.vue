<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer
    class="h-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 text-[10px] font-mono uppercase opacity-30 tracking-widest z-10 relative mt-12 hover:opacity-100 transition-opacity duration-300"
  >
    <span>坐标中国，在数字地平线上</span>
    <span class="group cursor-pointer">
      &copy; {{ currentYear }}
      <span class="group-hover:text-orange-400 transition-colors">Hgchen 个人工作室</span>
    </span>
    <span class="hidden md:inline cursor-default">无需滚动</span>
  </footer>
</template>
