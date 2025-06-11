import { create } from 'zustand';

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem('theme') || 'dark',
  setTheme: (theme) => {
    console.log('Setting theme to:', theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Update document attribute
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color
    const themeColors = {
      light: '#ffffff',
      dark: '#131419',
      midnight: '#0f172a',
      cyberpunk: '#18181b',
      matrix: '#0c0c0c',
      blackOrange: '#000000'
    };
    
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColors[theme as keyof typeof themeColors] || '#131419');
    }
    
    // Force a re-render by updating the store
    set({ theme });
    
    console.log('Theme updated to:', theme);
  },
}));