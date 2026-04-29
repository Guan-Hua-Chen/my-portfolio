<script setup lang="ts">
import { useScrollSpy } from './composables/useScrollSpy';
import { useScrollReveal } from './composables/useScrollReveal';
import { navSections } from './data/skills';

import BackgroundDecoration from './components/BackgroundDecoration.vue';
import CursorTrail from './components/CursorTrail.vue';
import AppNav from './components/AppNav.vue';
import AppFooter from './components/AppFooter.vue';
import HeroSection from './components/sections/HeroSection.vue';
import AboutSection from './components/sections/AboutSection.vue';
import ProjectsSection from './components/sections/ProjectsSection.vue';
import BlogSection from './components/sections/BlogSection.vue';

const { activeSection, showNavBackground, scrollTo } = useScrollSpy({
  sectionIds: navSections.map((s) => s.id),
});

useScrollReveal();
</script>

<template>
  <BackgroundDecoration />
  <CursorTrail />

  <AppNav
    :active-section="activeSection"
    :show-background="showNavBackground"
    @navigate="scrollTo"
  />

  <main class="relative text-[#f4f1ea] selection:bg-orange-500/30 overflow-x-hidden">
    <HeroSection @navigate="scrollTo" />
    <AboutSection />
    <ProjectsSection />
    <BlogSection />
    <AppFooter />
  </main>
</template>
