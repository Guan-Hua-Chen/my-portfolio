import { MonitorSmartphone, Terminal, BarChart3 } from 'lucide-vue-next';
import type { Project } from '../types';

import demo1_1 from '../assets/demo1_1.png';
import demo1_2 from '../assets/demo1_2.png';
import demo1_3 from '../assets/demo1_3.png';

export const works: Project[] = [
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
    title: 'AI数据分析管理平台',
    type: '全栈 / 数据智能',
    desc: '面向数据分析与智能对话的一站式管理平台。前端 Vue 3，后端 FastAPI + MySQL 承载业务与数据，结合 LangChain 实现自然语言查询与智能分析。',
    icon: BarChart3,
    tags: ['Vue 3', 'FastAPI', 'MySQL', 'LangChain'],
    gallery: [demo1_1, demo1_2, demo1_3],
  },
];
