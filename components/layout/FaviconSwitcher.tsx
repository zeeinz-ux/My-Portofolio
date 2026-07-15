"use client";

import { useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { publicPath } from "@/lib/paths";

export const FaviconSwitcher = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const logo = publicPath(theme === "dark" ? "/logo white.png" : "/logo black.png");
    
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
