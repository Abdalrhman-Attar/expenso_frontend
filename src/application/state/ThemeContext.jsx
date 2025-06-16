import { createContext, useState, useEffect } from "react";

const initialTheme = localStorage.getItem("theme") || "light";

export const ThemeContext = createContext({
  theme: initialTheme,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.body.className = "";
    document.body.classList.add(`${theme}-mode`);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
