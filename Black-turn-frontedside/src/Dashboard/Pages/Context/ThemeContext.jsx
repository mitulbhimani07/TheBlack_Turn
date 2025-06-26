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
    secondary: 'bg-[#f9fafb]',
    text: 'text-gray-900',
    textSecondary: 'text-gray-500',
    border: 'border-gray-200',
    accent: 'bg-[#2563eb]', // Blue-600
    accentHover: 'hover:bg-[#1d4ed8]', // Blue-700
    sidebar: 'bg-white',
    card: 'bg-white',
    sidebarText: 'text-gray-700',
    primaryLight: 'bg-blue-100',
    primaryText: 'text-[#2563eb]',
    accentText: 'text-[#2563eb]'
  },

  dark: {
    primary: 'bg-[#0f172a]', // Slate-900
    secondary: 'bg-[#1e293b]', // Slate-800
    text: 'text-white',
    textSecondary: 'text-gray-400',
    border: 'border-gray-700',
    accent: 'bg-[#3b82f6]', // Blue-500
    accentHover: 'hover:bg-[#2563eb]', // Blue-600
    sidebar: 'bg-[#0f172a]',
    card: 'bg-[#1e293b]',
    sidebarText: 'text-gray-300',
    primaryLight: 'bg-blue-900',
    primaryText: 'text-blue-300',
    accentText: 'text-blue-400'
  },

  teal: {
    primary: 'bg-[#f0fdfa]', // Teal-50
    secondary: 'bg-white',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
    border: 'border-[#14b8a6]', // Teal-500
    accent: 'bg-[#14b8a6]',
    accentHover: 'hover:bg-[#0d9488]', // Teal-600
    sidebar: 'bg-[#14b8a6]',
    card: 'bg-white',
    sidebarText: 'text-white',
    primaryLight: 'bg-teal-100',
    primaryText: 'text-[#0d9488]',
    accentText: 'text-[#0d9488]'
  },

  contrast: {
    primary: 'bg-white',
    secondary: 'bg-black',
    text: 'text-black',
    textSecondary: 'text-gray-600',
    border: 'border-black',
    accent: 'bg-[#f59e0b]', // Amber-500
    accentHover: 'hover:bg-[#d97706]', // Amber-600
    sidebar: 'bg-black',
    card: 'bg-[#f3f4f6]', // Gray-100
    sidebarText: 'text-white',
    primaryLight: 'bg-amber-100',
    primaryText: 'text-[#d97706]',
    accentText: 'text-[#d97706]'
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