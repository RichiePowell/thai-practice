"use client";

import { useEffect } from "react";

export const ThemeScript = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme") ?? "light";
    document.documentElement.classList.add(theme);
  }, []);

  return null;
};
