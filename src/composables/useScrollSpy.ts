import { onMounted, onUnmounted, ref } from 'vue';

interface UseScrollSpyOptions {
  sectionIds: string[];
  navOffsetThreshold?: number;
  viewportRatio?: number;
}

export function useScrollSpy({
  sectionIds,
  navOffsetThreshold = 50,
  viewportRatio = 0.4,
}: UseScrollSpyOptions) {
  const activeSection = ref(sectionIds[0] ?? '');
  const showNavBackground = ref(false);

  const handleScroll = () => {
    showNavBackground.value = window.scrollY > navOffsetThreshold;
    const probe = window.innerHeight * viewportRatio;

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= probe && rect.bottom >= probe) {
        activeSection.value = id;
        break;
      }
    }
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return { activeSection, showNavBackground, scrollTo };
}
