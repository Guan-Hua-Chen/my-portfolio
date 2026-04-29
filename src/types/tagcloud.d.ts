declare module 'TagCloud' {
  interface TagCloudOptions {
    radius?: number;
    maxSpeed?: 'slow' | 'normal' | 'fast';
    initSpeed?: 'slow' | 'normal' | 'fast';
    direction?: number;
    keep?: boolean;
    useHTML?: boolean;
    [key: string]: unknown;
  }

  interface TagCloudInstance {
    pause: () => void;
    resume: () => void;
    update: () => void;
    destroy: () => void;
  }

  function TagCloud(
    container: HTMLElement | string,
    texts: string[],
    options?: TagCloudOptions
  ): TagCloudInstance;

  export default TagCloud;
}
