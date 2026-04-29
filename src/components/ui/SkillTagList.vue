<script setup lang="ts">
defineProps<{
  tags: string[];
}>();
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="tag in tags"
      :key="tag"
      class="px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors rounded-full text-[11px] border border-white/10"
    >
      {{ tag }}
    </span>
  </div>
</template>
