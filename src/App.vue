<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Github, MonitorSmartphone, Code2, BookOpen, Terminal, Database, LayoutTemplate } from 'lucide-vue-next';
// @ts-ignore
import TagCloud from 'TagCloud';

const activeSection = ref('home');
const tagCloudRef = ref<HTMLElement | null>(null);
const cursorX = ref(0);
const cursorY = ref(0);
const isHovering = ref(false);
const showNavBackground = ref(false);
let observer: IntersectionObserver | null = null;
const cursorDots = ref(Array.from({ length: 8 }, () => ({ x: -100, y: -100 })));
let rafId: number;

// Simulated data
const projects = [
  {
    title: '个人博客系统',
    type: '前端展示',
    desc: '一个基于 Vue 3 的个人博客系统。提供美观的文章展示、流畅的交互体验和自适应布局。',
    icon: MonitorSmartphone,
    tags: ['Vue 3', 'JavaScript', 'HTML5', 'Tailwind']
  },
  {
    title: 'AI代码助手',
    type: 'AI应用',
    desc: '基于大语言模型的智能代码助手。帮助开发者更快地编写和调试代码。',
    icon: Terminal,
    tags: ['Vue 3', 'JavaScript', 'LLM API']
  },
  {
    title: '响应式后台管理系统',
    type: '全栈开发',
    desc: '为企业级Web应用打造的高定制、响应式后台管理系统。后端基于 FastAPI 与 MySQL 提供完整的各项业务功能支持。',
    icon: Database,
    tags: ['Vue 3', 'FastAPI', 'Python', 'MySQL']
  }
];

const posts = [
  {
    date: '10月 24, 2026',
    title: '使用 Python 和 FastAPI 构建高性能后端',
    readTime: '阅读时长 65分钟'
  },
  {
    date: '9月 12, 2025',
    title: 'Vue 3 组件化开发的最佳实践',
    readTime: '阅读时长 105分钟'
  },
  {
    date: '8月 05, 2025',
    title: '将大语言模型集成到 Web 应用中',
    readTime: '阅读时长 70分钟'
  }
];

const handleScroll = () => {
  const sections = ['home', 'about', 'projects', 'blog'];
  showNavBackground.value = window.scrollY > 50;
  for (const s of sections) {
    const el = document.getElementById(s);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
        activeSection.value = s;
        break;
      }
    }
  }
};

const handleMouseMove = (e: MouseEvent) => {
  cursorX.value = e.clientX;
  cursorY.value = e.clientY;
  
  if (cursorDots.value[0].x === -100) {
    cursorDots.value.forEach(dot => {
      dot.x = e.clientX;
      dot.y = e.clientY;
    });
  }
  
  const target = e.target as HTMLElement;
  isHovering.value = !!target.closest('button, a, .cursor-pointer, .tagcloud--item');
};

const updateDots = () => {
  let nextX = cursorX.value;
  let nextY = cursorY.value;
  
  cursorDots.value.forEach((dot) => {
    dot.x += (nextX - dot.x) * 0.4;
    dot.y += (nextY - dot.y) * 0.4;
    nextX = dot.x;
    nextY = dot.y;
  });
  
  rafId = requestAnimationFrame(updateDots);
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('mousemove', handleMouseMove);
  rafId = requestAnimationFrame(updateDots);
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Use setTimeout to ensure DOM is ready
  setTimeout(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer?.observe(el);
    });
  }, 100);
  
  if (tagCloudRef.value) {
    const texts = [
      '<i class="devicon-html5-plain colored" style="font-size: 3rem;"></i>',
      '<i class="devicon-css3-plain colored" style="font-size: 3rem;"></i>',
      '<i class="devicon-javascript-plain colored" style="font-size: 3rem;"></i>',
      '<i class="devicon-vuejs-plain colored" style="font-size: 3rem;"></i>',
      '<i class="devicon-python-plain colored" style="font-size: 3rem;"></i>',
      '<i class="devicon-fastapi-plain colored" style="font-size: 3rem;"></i>',
      '<i class="devicon-mysql-plain colored" style="font-size: 3rem;"></i>',
      '<i class="devicon-github-plain" style="font-size: 3rem; color: #fff;"></i>',
      '<i class="devicon-tailwindcss-plain colored" style="font-size: 3rem;"></i>',
      '<i class="devicon-nodejs-plain colored" style="font-size: 3rem;"></i>',
      '<i class="devicon-git-plain colored" style="font-size: 3rem;"></i>',
      '<i class="devicon-vscode-plain colored" style="font-size: 3rem;"></i>'
    ];
    
    // Initializing TagCloud
    TagCloud(tagCloudRef.value, texts, {
      radius: window.innerWidth < 768 ? 130 : 180,
      maxSpeed: 'fast',
      initSpeed: 'normal',
      direction: 135,
      keep: true,
      useHTML: true
    } as any);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('mousemove', handleMouseMove);
  if (observer) {
    observer.disconnect();
  }
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
});

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <div class="fixed inset-0 z-[-1] bg-[#0c0c0c] overflow-hidden pointer-events-none">
    <!-- Visual Accents -->
    <div class="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full sunset-gradient opacity-30 blur-3xl animate-pulse-slow"></div>
    <div class="absolute bottom-[-100px] right-[-50px] w-96 h-96 bg-orange-600 rounded-full blur-[120px] opacity-20"></div>
    <div class="absolute top-[-50px] right-[20%] w-px h-64 bg-gradient-to-b from-transparent via-orange-400/20 to-transparent"></div>
  </div>

  <!-- Cursor Trails -->
  <div 
    v-for="(dot, i) in cursorDots" 
    :key="i"
    class="cursor-trail hidden md:block" 
    :style="{ 
      transform: `translate3d(calc(${dot.x}px - 50%), calc(${dot.y}px - 50%), 0) scale(${(cursorDots.length - i) / cursorDots.length})`,
      opacity: (cursorDots.length - i) / cursorDots.length * 0.6
    }"
  ></div>

  <nav 
    class="fixed top-0 left-0 right-0 z-50 h-20 w-full flex items-center justify-between px-6 md:px-12 transition-all duration-500"
    :class="showNavBackground ? 'bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50' : 'bg-transparent border-transparent'"
  >
    <div class="text-2xl font-serif italic tracking-tighter cursor-pointer hover:text-orange-300 transition-colors" @click="scrollTo('home')">Hgcheni.</div>
    
    <!-- Mobile menu button placeholders, hidden on MD -->
    <div class="md:hidden text-[#f4f1ea] uppercase text-xs tracking-widest menu-btn cursor-pointer active:text-orange-400 transition-colors">菜单</div>
    
    <div class="hidden md:flex gap-8 text-xs uppercase tracking-widest font-semibold opacity-60">
      <button @click="scrollTo('home')" :class="{ 'opacity-100 border-b border-orange-400': activeSection === 'home' }" class="hover:opacity-100 transition-all hover:-translate-y-0.5 pb-1">首页</button>
      <button @click="scrollTo('about')" :class="{ 'opacity-100 border-b border-orange-400': activeSection === 'about' }" class="hover:opacity-100 transition-all hover:-translate-y-0.5 pb-1">关于我</button>
      <button @click="scrollTo('projects')" :class="{ 'opacity-100 border-b border-orange-400': activeSection === 'projects' }" class="hover:opacity-100 transition-all hover:-translate-y-0.5 pb-1">项目</button>
      <button @click="scrollTo('blog')" :class="{ 'opacity-100 border-b border-orange-400': activeSection === 'blog' }" class="hover:opacity-100 transition-all hover:-translate-y-0.5 pb-1">博客</button>
    </div>
  </nav>

  <main class="relative text-[#f4f1ea] selection:bg-orange-500/30 overflow-x-hidden">
    
    <!-- HERO SECTION -->
    <section id="home" class="min-h-screen flex flex-col justify-center relative px-6 md:px-12 pt-20">
      <div class="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-12 items-center">
        <div class="flex-1 animate-fade-in-up md:text-left text-center z-10 w-full reveal-on-scroll">
          <span class="inline-block text-orange-400 font-semibold text-sm tracking-widest uppercase mb-4">前端开发 & AI探索者</span>
          <h1 class="text-6xl md:text-[90px] lg:text-[110px] leading-[0.85] font-serif font-bold italic mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-orange-400">
            个人<br />开发者
          </h1>
          <p class="max-w-md mx-auto md:mx-0 text-lg text-orange-100 opacity-60 leading-relaxed font-light mb-8">
            在代码与创意的交汇处，编织无缝的全栈网页体验。
          </p>
          <div class="flex items-center justify-center md:justify-start gap-6">
            <button @click="scrollTo('projects')" class="px-8 py-4 bg-orange-400 text-black font-bold uppercase text-xs tracking-widest hover:bg-orange-300 transition-all rounded-full hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20">
              查看作品集
            </button>
            <div class="h-[1px] w-12 bg-white/20 hidden md:block transition-all hover:w-16"></div>
            <a href="https://github.com" target="_blank" class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-60 hover:opacity-100 hover:scale-110 hover:border-orange-400 hover:text-orange-400 transition-all">
               <Github class="w-5 h-5"/>
            </a>
          </div>
        </div>
        
        <div class="flex-1 hidden md:flex justify-center items-center relative animate-fade-in-up" style="animation-delay: 0.2s;">
          <div class="relative w-[300px] h-[400px]">
             <!-- Abstract background decorative element -->
             <div class="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-[30px] -rotate-6 transform scale-105 blur-sm z-0 transition-transform duration-500 hover:rotate-[-8deg]"></div>
             
             <!-- Main photo container -->
             <div class="absolute inset-0 rounded-2xl overflow-hidden glass-panel border border-white/10 z-10 transform rotate-3 transition-all duration-500 hover:rotate-1 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,157,92,0.2)]">
                <img src="https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1470&auto=format&fit=crop" alt="Developer setup" class="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
             </div>
             
             <!-- Overlay photo 1 -->
             <div class="absolute -bottom-8 -left-12 w-40 h-40 rounded-2xl overflow-hidden glass-panel border border-white/10 z-20 transform -rotate-6 transition-all duration-500 hover:rotate-0 hover:scale-110 shadow-xl">
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop" alt="Code" class="w-full h-full object-cover opacity-80" />
             </div>
             
             <!-- Overlay photo 2 -->
             <div class="absolute -top-6 -right-8 w-32 h-32 rounded-full overflow-hidden glass-panel border border-white/10 z-20 transform rotate-12 transition-all duration-500 hover:rotate-0 hover:scale-110 shadow-xl">
                <img src="https://images.unsplash.com/photo-1627398246734-d8db5b8eb580?q=80&w=1470&auto=format&fit=crop" alt="Hardware" class="w-full h-full object-cover opacity-80" />
             </div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-10 right-6 md:right-12 flex gap-4 opacity-50 hidden sm:flex animate-bounce">
        <div class="vertical-text text-[10px] tracking-widest uppercase font-mono">向下滚动</div>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section id="about" class="min-h-screen flex items-center py-24 px-6 md:px-12 relative">
      <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="space-y-8 reveal-on-scroll">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold italic text-orange-200">关于我</h2>
          <div class="space-y-6 opacity-60 font-light leading-relaxed md:text-lg">
            <p>
              我是一名大三学生，也是一名充满热情的前端开发者。我致力于构建直观、美观且响应迅速的用户界面。
            </p>
            <p>
              我具备扎实的前端基础，熟练掌握 Vue 等现代框架。同时，我也在积极学习 Python 和 FastAPI 等后端技术，探索 AI 全栈开发的无限可能。
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-6 pt-8 border-t border-white/5">
            <div class="space-y-2 flex-1 glass-panel p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300">
              <Code2 class="w-8 h-8 text-orange-400 mb-2" />
              <h3 class="text-[10px] uppercase tracking-widest text-orange-400 font-bold mb-4">前端技术</h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors rounded-full text-[11px] border border-white/10">HTML/CSS</span>
                <span class="px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors rounded-full text-[11px] border border-white/10">JavaScript</span>
                <span class="px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors rounded-full text-[11px] border border-white/10">Vue 3</span>
              </div>
            </div>
            <div class="space-y-2 flex-1 glass-panel p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300 delay-100">
              <Database class="w-8 h-8 text-orange-400 mb-2" />
              <h3 class="text-[10px] uppercase tracking-widest text-orange-400 font-bold mb-4">后端技术</h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors rounded-full text-[11px] border border-white/10">Python</span>
                <span class="px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors rounded-full text-[11px] border border-white/10">FastAPI</span>
                <span class="px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors rounded-full text-[11px] border border-white/10">MySQL</span>
              </div>
            </div>
          </div>
        </div>
        <div class="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden glass-panel flex items-center justify-center group flex-col text-center px-6 reveal-on-scroll delay-200">
          <div class="absolute inset-0 bg-gradient-to-tr from-orange-400/5 to-transparent z-0 transition-opacity duration-500 group-hover:opacity-75"></div>
          <div ref="tagCloudRef" class="tagcloud-wrapper z-10 w-full h-full flex items-center justify-center"></div>
        </div>
      </div>
    </section>

    <!-- PROJECTS SECTION -->
    <section id="projects" class="py-24 px-6 md:px-12 relative z-10">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal-on-scroll">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold italic text-orange-200">精选作品</h2>
          <button class="px-6 py-2 bg-transparent text-white font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 hover:scale-105 active:scale-95 border border-white/10 transition-all rounded-full hidden md:block">查看所有项目</button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(project, i) in projects" :key="i" class="glass-panel group cursor-pointer relative overflow-hidden rounded-2xl flex flex-col h-full reveal-on-scroll" :style="`transition-delay: ${i * 150}ms`">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            
            <div class="h-40 bg-gradient-to-br from-orange-500/10 group-hover:from-orange-500/20 to-transparent relative p-6 transition-all duration-500 z-10">
              <div class="absolute top-4 right-4 text-[10px] font-mono text-orange-400/70 group-hover:text-orange-400 transition-colors">项目 // 0{{ i+1 }}</div>
              <div class="mt-auto absolute bottom-6 left-6 transform transition-transform group-hover:translate-x-2">
                <h3 class="text-2xl font-serif italic">{{ project.title }}</h3>
                <p class="text-xs font-bold tracking-widest text-[#f4f1ea] opacity-50 uppercase mt-1">{{ project.type }}</p>
              </div>
            </div>
            
            <div class="p-6 flex-1 bg-white/[0.02] flex flex-col justify-between space-y-6 z-10">
              <p class="text-xs leading-relaxed opacity-70 group-hover:opacity-90 transition-opacity">{{ project.desc }}</p>
              
              <div>
                <div class="flex flex-wrap gap-2 pt-4 mb-6">
                  <span v-for="tag in project.tags" :key="tag" class="px-3 py-1 bg-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all rounded-full text-[11px] border border-white/10">
                    {{ tag }}
                  </span>
                </div>
                <div class="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
                  <span class="text-[10px] font-mono opacity-40 group-hover:opacity-60 transition-opacity">案例研究 {{ new Date().getFullYear() }}</span>
                  <div class="w-10 h-10 rounded-full border border-orange-400 flex items-center justify-center text-orange-400 group-hover:bg-orange-400 group-hover:text-black group-hover:scale-110 transition-all duration-300">→</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BLOG SECTION -->
    <section id="blog" class="py-32 px-6 md:px-12">
      <div class="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-2xl reveal-on-scroll relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-orange-400/0 via-transparent to-orange-400/5 group-hover:to-orange-400/10 transition-colors duration-700 pointer-events-none"></div>
        
        <h3 class="text-[10px] uppercase tracking-widest text-orange-400 font-bold mb-8 relative z-10">最近学习</h3>
        
        <div class="space-y-0 relative z-10">
          <div v-for="(post, i) in posts" :key="i" class="group/post cursor-pointer py-6 border-b border-white/5 last:border-0 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-500 hover:border-orange-400/30">
            <div class="space-y-2 transform transition-transform duration-300 group-hover/post:translate-x-2">
              <span class="text-[10px] font-mono opacity-40 block">{{ post.date }} &nbsp;&bull;&nbsp; {{ post.readTime }}</span>
              <h4 class="text-lg md:text-xl font-semibold group-hover/post:text-orange-400 transition-colors">{{ post.title }}</h4>
            </div>
            <div class="w-8 h-8 rounded-full border border-white/10 items-center justify-center group-hover/post:border-orange-400 group-hover/post:bg-orange-400 group-hover/post:text-black transition-all opacity-30 group-hover/post:opacity-100 duration-300 hidden md:flex">
              <BookOpen class="w-3 h-3 group-hover/post:scale-110 transition-transform" />
            </div>
          </div>
        </div>
        
        <div class="mt-8 text-center md:text-left relative z-10">
           <button class="px-6 py-2 bg-transparent text-white font-bold uppercase text-[10px] tracking-widest hover:bg-white/5 border border-white/10 transition-all rounded-full hover:scale-105 active:scale-95">探索日志</button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="h-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 text-[10px] font-mono uppercase opacity-30 tracking-widest z-10 relative mt-12 hover:opacity-100 transition-opacity duration-300">
      <span>坐标中国，在数字地平线上</span>
      <span class="group cursor-pointer">&copy; {{ new Date().getFullYear() }} <span class="group-hover:text-orange-400 transition-colors">Hgchen 个人工作室</span></span>
      <span class="hidden md:inline cursor-default">无需滚动</span>
    </footer>
  </main>
</template>

<style>
.sunset-gradient { background: linear-gradient(135deg, #ff9d5c 0%, #e76f51 50%, #2a1b3d 100%); }
.sunset-glow { box-shadow: 0 0 80px rgba(231, 111, 81, 0.4); }
.glass-panel { 
  background: rgba(255, 255, 255, 0.03); 
  border: 1px solid rgba(255, 255, 255, 0.08); 
  backdrop-filter: blur(10px); 
}

.title-serif {
  font-family: 'Playfair Display', serif;
}

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.cursor-trail {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  background-color: #ff9d5c;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  mix-blend-mode: difference;
  will-change: transform;
}

/* TagCloud styles */
.tagcloud-wrapper {
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tagcloud-wrapper .tagcloud {
  display: inline-block;
}
.tagcloud-wrapper .tagcloud--item {
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 10px;
}
.tagcloud-wrapper .tagcloud--item:hover {
  transform: scale(1.3) !important;
  filter: drop-shadow(0 0 15px rgba(255, 150, 80, 0.8));
  z-index: 10;
}

/* Scroll Reveal Animations */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal-on-scroll.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Base Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; transform: translateY(-50%) scale(1); }
  50% { opacity: 0.4; transform: translateY(-50%) scale(1.05); }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

/* Responsive Overrides */
html {
  scroll-behavior: smooth;
  cursor: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='%23ff9d5c' stroke='%23ffffff' stroke-width='1.5' stroke-linejoin='round'%3E%3Cpath d='M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z'/%3E%3C/svg%3E") 3 3, auto;
}

button, a, .cursor-pointer, .tagcloud--item, .group {
  cursor: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='%23e76f51' stroke='%23ffffff' stroke-width='1.5' stroke-linejoin='round'%3E%3Cpath d='M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z'/%3E%3C/svg%3E") 3 3, pointer !important;
}

@media (max-width: 768px) {
  html, button, a, .cursor-pointer, .tagcloud--item, .group {
    cursor: auto !important;
  }
}
</style>
