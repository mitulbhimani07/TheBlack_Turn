import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  light: {
    primary: 'bg-white',
    secondary: 'bg-[#ebf4f5]',
    text: 'text-black',
    textSecondary: 'text-gray-600',
    border: 'border-gray-200',
    accent: 'bg-[#005f73]',
    accentHover: 'hover:bg-[#004a5a]',
    sidebar: 'bg-white',
    card: 'bg-white',
    sidebarText: 'text-gray-700',
    accentText: 'text-[#005f73]'
  },
  dark: {
    primary: 'bg-black',
    secondary: 'bg-gray-900',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    border: 'border-gray-700',
    accent: 'bg-[#005f73]',
    accentHover: 'hover:bg-[#004a5a]',
    sidebar: 'bg-black',
    card: 'bg-gray-900',
    sidebarText: 'text-gray-300',
    accentText: 'text-[#005f73]'
  },
  teal: {
    primary: 'bg-[#ebf4f5]',
    secondary: 'bg-white',
    text: 'text-black',
    textSecondary: 'text-gray-600',
    border: 'border-[#005f73]',
    accent: 'bg-[#005f73]',
    accentHover: 'hover:bg-[#004a5a]',
    sidebar: 'bg-[#005f73]',
    card: 'bg-white',
    sidebarText: 'text-white',
    accentText: 'text-[#005f73]'
  },
  contrast: {
    primary: 'bg-white',
    secondary: 'bg-black',
    text: 'text-black',
    textSecondary: 'text-gray-600',
    border: 'border-black',
    accent: 'bg-[#005f73]',
    accentHover: 'hover:bg-[#004a5a]',
    sidebar: 'bg-black',
    card: 'bg-[#ebf4f5]',
    sidebarText: 'text-white',
    accentText: 'text-[#005f73]'
  }
};

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('light');

  const setTheme = (theme) => {
    setThemeName(theme);
  };

  const themeValue = {
    currentTheme: themes[themeName],
    setTheme,
    themeName,
    themes: Object.keys(themes)
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};