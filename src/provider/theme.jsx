import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorageState } from '../hook';
import { ThemeContext } from './context';

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorageState('theme', '');
  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme((prevTheme) => (prevTheme === 'dark' ? '' : 'dark')),
  }), [theme, setTheme]);
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
