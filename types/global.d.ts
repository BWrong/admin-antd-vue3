declare global {
  interface Window {
    __APP_CONFIG__: {
      VITE_GLOBAL_COLOR_SCHEME: 'auto' | 'light' | 'dark';
      VITE_GLOBAL_LAYOUT: 'side' | 'top' | 'mix';
      [key: string]: any;
    };
  }
}
export {};
