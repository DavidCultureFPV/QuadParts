import { create } from 'zustand';

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem('theme') || 'dark',
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
    
    // Update meta theme-color
    const themeColors = {
      light: '#ffffff',
      dark: '#131419',
      midnight: '#0f172a',
      cyberpunk: '#18181b',
      matrix: '#0c0c0c',
      blackOrange: '#000000'
    };
    
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', themeColors[theme as keyof typeof themeColors] || '#131419');
  },
}));