<script setup lang="ts">
import HeroSection from '../../components/sections/HeroSection.vue';
import AboutSection from '../../components/sections/AboutSection.vue';
import WorksSection from '../../components/sections/WorksSection.vue';
import GamesSection from '../../components/sections/GamesSection.vue';
import AppFooter from '../../components/AppFooter.vue';
import { useScrollReveal } from '../../composables/useScrollReveal';

useScrollReveal();

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <div>
    <HeroSection @navigate="scrollTo" />
    <AboutSection />
    <WorksSection />
    <GamesSection />
    <AppFooter />
  </div>
</template>
