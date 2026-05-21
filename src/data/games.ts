import { Gamepad2 } from 'lucide-vue-next';
import type { Project } from '../types';

export const games: Project[] = [
  {
    title: '贪吃蛇',
    type: '小游戏',
    desc: '经典的贪吃蛇游戏，使用 Vue 3 组合式 API 开发。',
    icon: Gamepad2,
    tags: ['Vue 3', 'Canvas'],
    link: '/snake'
  },
  {
    title: '敬请期待',
    type: '小游戏',
    desc: '更多精彩即将呈现...',
    icon: Gamepad2,
    tags: ['互动', '娱乐'],
  },
];
