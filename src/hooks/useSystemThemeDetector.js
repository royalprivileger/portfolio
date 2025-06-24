import { useEffect, useState } from "react";

export default function useSystemThemeDetector() {
  const getCurrentTheme = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());

  useEffect(() => {
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setIsDarkTheme(e.matches);
    matcher.addEventListener("change", onChange);

    return () => matcher.removeEventListener("change", onChange);
  }, []);

  return isDarkTheme;
}