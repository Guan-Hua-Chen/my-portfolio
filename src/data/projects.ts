import { MonitorSmartphone, Terminal, Database } from 'lucide-vue-next';
import type { Project } from '../types';

export const projects: Project[] = [
  {
    title: '个人博客系统',
    type: '前端展示',
    desc: '一个基于 Vue 3 的个人博客系统。提供美观的文章展示、流畅的交互体验和自适应布局。',
    icon: MonitorSmartphone,
    tags: ['Vue 3', 'JavaScript', 'HTML5', 'Tailwind'],
  },
  {
    title: 'AI代码助手',
    type: 'AI应用',
    desc: '基于大语言模型的智能代码助手。帮助开发者更快地编写和调试代码。',
    icon: Terminal,
    tags: ['Vue 3', 'JavaScript', 'LLM API'],
  },
  {
    title: '响应式后台管理系统',
    type: '全栈开发',
    desc: '为企业级Web应用打造的高定制、响应式后台管理系统。后端基于 FastAPI 与 MySQL 提供完整的各项业务功能支持。',
    icon: Database,
    tags: ['Vue 3', 'FastAPI', 'Python', 'MySQL'],
  },
];
