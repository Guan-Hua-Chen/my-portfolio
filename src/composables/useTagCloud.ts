import { onMounted, onUnmounted, type Ref } from 'vue';
import TagCloud from 'TagCloud';

interface UseTagCloudOptions {
  containerRef: Ref<HTMLElement | null>;
  texts: string[];
  mobileBreakpoint?: number;
  mobileRadius?: number;
  desktopRadius?: number;
}

export function useTagCloud({
  containerRef,
  texts,
  mobileBreakpoint = 768,
  mobileRadius = 130,
  desktopRadius = 180,
}: UseTagCloudOptions) {
  let instance: ReturnType<typeof TagCloud> | null = null;

  onMounted(() => {
    if (!containerRef.value) return;

    instance = TagCloud(containerRef.value, texts, {
      radius: window.innerWidth < mobileBreakpoint ? mobileRadius : desktopRadius,
      maxSpeed: 'fast',
      initSpeed: 'normal',
      direction: 135,
      keep: true,
      useHTML: true,
    });
  });

  onUnmounted(() => {
    instance?.destroy?.();
    instance = null;
  });
}
