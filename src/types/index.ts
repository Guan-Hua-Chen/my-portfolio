import type { Component } from 'vue';

export interface Project {
  title: string;
  type: string;
  desc: string;
  icon: Component;
  tags: string[];
}

export interface Post {
  date: string;
  title: string;
  readTime: string;
}

export interface CursorDot {
  x: number;
  y: number;
}
