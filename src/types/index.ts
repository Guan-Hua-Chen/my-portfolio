import type { Component } from 'vue';

export interface Project {
  title: string;
  type: string;
  desc: string;
  icon: Component;
  tags: string[];
  /** Preview images imported as URLs */
  gallery?: string[];
  link?: string;
}

export interface CursorDot {
  x: number;
  y: number;
}
