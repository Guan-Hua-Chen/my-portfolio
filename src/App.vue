<script setup lang="ts">
import { useScrollSpy } from './composables/useScrollSpy';
import { navSections } from './data/skills';
import { useRouter, useRoute } from 'vue-router';

import BackgroundDecoration from './components/BackgroundDecoration.vue';
import CursorTrail from './components/CursorTrail.vue';
import ClickRipple from './components/ClickRipple.vue';
import AppNav from './components/AppNav.vue';

const router = useRouter();
const route = useRoute();

const { activeSection, showNavBackground, scrollTo: spyScrollTo } = useScrollSpy({
  sectionIds: navSections.map((s) => s.id),
});

const scrollTo = async (id: string) => {
  if (route.path !== '/') {
    await router.push('/');
    setTimeout(() => spyScrollTo(id), 100);
  } else {
    spyScrollTo(id);
  }
};
</script>

<template>
  <BackgroundDecoration />
  <ClickRipple />
  <CursorTrail />

  <AppNav
    :active-section="activeSection"
    :show-background="showNavBackground"
    @navigate="scrollTo"
  />

  <main class="relative text-[#f4f1ea] selection:bg-orange-500/30 overflow-x-hidden min-h-screen">
    <router-view></router-view>
  </main>
</template>
