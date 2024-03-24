import { createContext, useContext } from 'react';

export const I8nContext = createContext();
export const ThemeContext = createContext();

export function useI8n() {
  return useContext(I8nContext);
}

export function useTheme() {
  return useContext(ThemeContext);
}
