import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/index.vue';
import Snake from '../views/snake/index.vue';

const router = createRouter({
  history: createWebHistory('/my-portfolio/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/snake',
      name: 'snake',
      component: Snake
    }
  ]
});

export default router;
