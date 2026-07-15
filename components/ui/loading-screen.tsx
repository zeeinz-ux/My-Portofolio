"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/providers/ThemeProvider";

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Hide the loading screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration mismatch by returning null until mounted,
  // but actually we want the loading screen to show ASAP.
  // We can just use standard classes or force it based on document body class,
  // but using the theme context is fine since the ThemeProvider mounts immediately.
  const isDark = theme === "dark" || !theme; // Fallback to dark visually if undefined initially

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-colors duration-300 ${
            isDark ? "bg-zinc-950" : "bg-zinc-50"
          }`}
        >
          {/* Logo & Text container */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, x: 50, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{
                opacity: { duration: 0.8, ease: "easeOut" },
                scale: { duration: 0.8, ease: "easeOut" },
                filter: { duration: 0.8, ease: "easeOut" },
                x: { delay: 1.0, duration: 0.8, ease: [0.76, 0, 0.24, 1] },
              }}
            >
              <Image
                src={isDark ? "/logo white.png" : "/logo black.png"}
                alt="Zeinz Logo"
                width={45}
                height={45}
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{
                delay: 1.0,
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <span
                className={`text-4xl sm:text-5xl font-bold tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Zeinz
              </span>
            </motion.div>
          </div>

          {/* Progress bar */}
          <motion.div
            className={`mt-10 w-56 h-[2px] overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-black/10"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className={`h-full ${isDark ? "bg-white" : "bg-black"}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
