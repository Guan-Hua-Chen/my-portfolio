import { onMounted, onUnmounted, ref } from 'vue';

export interface ClickRippleItem {
  id: number;
  x: number;
  y: number;
}

const DURATION_MS = 800;

export function useClickRipple() {
  const ripples = ref<ClickRippleItem[]>([]);
  let idCounter = 0;
  const timers = new Map<number, ReturnType<typeof setTimeout>>();

  const handleClick = (e: MouseEvent) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = ++idCounter;
    ripples.value.push({ id, x: e.clientX, y: e.clientY });

    const t = window.setTimeout(() => {
      ripples.value = ripples.value.filter((r) => r.id !== id);
      timers.delete(id);
    }, DURATION_MS);
    timers.set(id, t);
  };

  onMounted(() => {
    window.addEventListener('click', handleClick);
  });

  onUnmounted(() => {
    window.removeEventListener('click', handleClick);
    timers.forEach((t) => clearTimeout(t));
    timers.clear();
  });

  return { ripples };
}
