"use client";

import { ThemeProvider } from "./ThemeProvider";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { FaviconSwitcher } from "@/components/layout/FaviconSwitcher";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <FaviconSwitcher />
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </ThemeProvider>
  );
};
