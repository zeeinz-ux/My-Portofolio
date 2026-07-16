"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { publicPath } from "@/lib/paths";

export const FaviconSwitcher = () => {
  const { theme } = useTheme();
  const linkRef = useRef<HTMLLinkElement | null>(null);

  useEffect(() => {
    if (!linkRef.current) {
      linkRef.current =
        document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!linkRef.current) {
        linkRef.current = document.createElement("link");
        linkRef.current.rel = "icon";
        document.head.appendChild(linkRef.current);
      }
    }
    linkRef.current.href = publicPath(
      theme === "dark" ? "/logo white.png" : "/logo black.png"
    );
  }, [theme]);

  return null;
};
