import { useEffect, useState } from "react";
import useSystemThemeDetector from "./useSystemThemeDetector"; // existing system theme detector

export default function useTheme() {
  const [mode, setMode] = useState("system");
  const isSystemDark = useSystemThemeDetector();

  /*
    -Below function applies the theme on root element
  */
  const applyTheme = (theme) => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.toggle("dark", isSystemDark);
    }
  };

  /*
   -Below useEffect Reads the localStorage on load and checks for selected mode if none then default is system 
  */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setMode(saved);
      applyTheme(saved);
    } else {
      setMode("system");
      applyTheme("system");
    }
  }, []);

  /*
   -Below useEffect watches the system theme change and changes the page theme accordingly
  */
  useEffect(() => {
    if (mode === "system") {
      applyTheme(isSystemDark ? "dark" : "light");
    }
  }, [mode, isSystemDark]);

  /*
   -Below function is for setting the theme based on user selection
  */
  const updateMode = (value) => {
    setMode(value);
    localStorage.setItem("theme", value);
    applyTheme(value);
  };

  return { mode, setMode: updateMode, applyTheme };
}
