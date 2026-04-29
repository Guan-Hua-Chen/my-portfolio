import { onMounted, onUnmounted } from 'vue';

interface UseScrollRevealOptions {
  selector?: string;
  revealClass?: string;
  threshold?: number;
  rootMargin?: string;
  delayMs?: number;
}

export function useScrollReveal({
  selector = '.reveal-on-scroll',
  revealClass = 'is-revealed',
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  delayMs = 100,
}: UseScrollRevealOptions = {}) {
  let observer: IntersectionObserver | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(revealClass);
          }
        });
      },
      { threshold, rootMargin }
    );

    timer = setTimeout(() => {
      document.querySelectorAll(selector).forEach((el) => {
        observer?.observe(el);
      });
    }, delayMs);
  });

  onUnmounted(() => {
    if (timer) clearTimeout(timer);
    observer?.disconnect();
    observer = null;
  });
}
