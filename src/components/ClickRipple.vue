<script setup lang="ts">
import { useClickRipple } from '../composables/useClickRipple';

const { ripples } = useClickRipple();
</script>

<template>
  <div class="click-ripple-layer" aria-hidden="true">
    <div
      v-for="r in ripples"
      :key="r.id"
      class="click-ripple-pack"
      :style="{ left: `${r.x}px`, top: `${r.y}px` }"
    >
      <span class="click-ripple-ring" />
      <span class="click-ripple-ring click-ripple-ring--lag" />
    </div>
  </div>
</template>

<style scoped>
.click-ripple-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9997;
}

.click-ripple-pack {
  position: fixed;
  width: 0;
  height: 0;
  transform: translate(-50%, -50%);
}

.click-ripple-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 48px;
  height: 48px;
  margin-left: -24px;
  margin-top: -24px;
  border-radius: 50%;
  border: 2px solid rgba(255, 157, 92, 0.55);
  box-shadow: 0 0 12px rgba(255, 157, 92, 0.15);
  opacity: 0.9;
  transform: scale(0.35);
  transform-origin: center;
  animation: click-ripple-wave 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.click-ripple-ring--lag {
  border-color: rgba(231, 111, 81, 0.4);
  animation-delay: 0.1s;
}

@keyframes click-ripple-wave {
  from {
    opacity: 0.85;
    transform: scale(0.35);
  }
  to {
    transform: scale(5.5);
    opacity: 0;
  }
}
</style>
