import { useTheme } from "../../../../application/utils/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
      <div className={`icon-wrapper ${theme === "dark" ? "dark" : "light"}`}>
        <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
      </div>
    </button>
  );
};

export default ThemeToggle;
