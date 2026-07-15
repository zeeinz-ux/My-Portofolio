"use client";

import { useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";

/**
 * Dynamically swaps the favicon based on the active theme.
 * Light theme → black logo (visible on light browser tabs)
 * Dark theme  → white logo (visible on dark browser tabs)
 */
export const FaviconSwitcher = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const logo = theme === "dark" ? "/logo white.png" : "/logo black.png";
    
    // Find or create the favicon link element
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = logo;
  }, [theme]);

  return null; // renders nothing
};
