import { useLocalStorageState } from "../hook";
import { ThemeContext } from "./context";
import PropTypes from "prop-types";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorageState("theme", "");
  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === "dark" ? "" : "dark"));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
