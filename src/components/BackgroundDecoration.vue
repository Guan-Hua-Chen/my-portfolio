<script setup lang="ts"></script>

<template>
  <div class="fixed inset-0 z-[-1] bg-[#0c0c0c] overflow-hidden pointer-events-none">
    <div class="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full sunset-gradient opacity-30 blur-3xl animate-pulse-slow"></div>
    <div class="absolute bottom-[-100px] right-[-50px] w-96 h-96 bg-orange-600 rounded-full blur-[120px] opacity-20"></div>
    <div class="absolute top-[-50px] right-[20%] w-px h-64 bg-gradient-to-b from-transparent via-orange-400/20 to-transparent"></div>
  </div>
</template>
