import { useTheme } from "Context/ThemeContext";
import type { ThemeSwitchProps } from "./type";
import classNames from "classnames";
import "./styles.scss";

export default function ThemeSwitch({ size = "md", className }: ThemeSwitchProps) {
  const { theme, toggleTheme } = useTheme();

  const switchClass = classNames(
    "theme-switch",
    `theme-switch--${theme}`,
    className,
    {
      "theme-switch--sm": size === "sm",
      "theme-switch--lg": size === "lg",
    }
  );

  return (
    <button onClick={toggleTheme} className={switchClass} aria-label="Toggle theme">
      <div className="switch-track">
        <div className="switch-thumb">
          {theme === "light" ? (
            <span className="icon sun">☀️</span>
          ) : (
            <span className="icon moon">🌙</span>
          )}
        </div>
      </div>
    </button>
  );
}
