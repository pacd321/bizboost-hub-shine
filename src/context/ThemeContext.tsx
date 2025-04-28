import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeSettings {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  buttonStyle: string;
}

interface ThemeContextType {
  theme: ThemeSettings;
  updateTheme: (newTheme: Partial<ThemeSettings>) => void;
}

export const defaultTheme: ThemeSettings = {
  primaryColor: '#0066FF',
  backgroundColor: '#FFFFFF',
  textColor: '#222222',
  fontFamily: 'Inter',
  buttonStyle: 'rounded',
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  updateTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings>(() => {
    // Try to load theme from localStorage
    const savedTheme = localStorage.getItem('websiteTheme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  const updateTheme = (newTheme: Partial<ThemeSettings>) => {
    setTheme(prev => {
      const updatedTheme = { ...prev, ...newTheme };
      localStorage.setItem('websiteTheme', JSON.stringify(updatedTheme));
      return updatedTheme;
    });
  };

  // Apply theme to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
    document.documentElement.style.setProperty('--text-color', theme.textColor);
    document.documentElement.style.setProperty('--font-family', theme.fontFamily);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 