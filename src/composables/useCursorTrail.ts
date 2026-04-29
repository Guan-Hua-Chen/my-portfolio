import { onMounted, onUnmounted, ref } from 'vue';
import type { CursorDot } from '../types';

const HOVER_SELECTOR = 'button, a, .cursor-pointer, .tagcloud--item';

export function useCursorTrail(dotCount = 8) {
  const cursorX = ref(0);
  const cursorY = ref(0);
  const isHovering = ref(false);
  const cursorDots = ref<CursorDot[]>(
    Array.from({ length: dotCount }, () => ({ x: -100, y: -100 }))
  );

  let rafId = 0;

  const handleMouseMove = (e: MouseEvent) => {
    cursorX.value = e.clientX;
    cursorY.value = e.clientY;

    if (cursorDots.value[0].x === -100) {
      cursorDots.value.forEach((dot) => {
        dot.x = e.clientX;
        dot.y = e.clientY;
      });
    }

    const target = e.target as HTMLElement | null;
    isHovering.value = !!target?.closest(HOVER_SELECTOR);
  };

  const updateDots = () => {
    let nextX = cursorX.value;
    let nextY = cursorY.value;

    cursorDots.value.forEach((dot) => {
      dot.x += (nextX - dot.x) * 0.4;
      dot.y += (nextY - dot.y) * 0.4;
      nextX = dot.x;
      nextY = dot.y;
    });

    rafId = requestAnimationFrame(updateDots);
  };

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(updateDots);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    if (rafId) cancelAnimationFrame(rafId);
  });

  return { cursorDots, isHovering };
}
