"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { publicPath } from "@/lib/paths";

export const LoadingScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("portfolio_loaded")) {
      setVisible(false);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.random() * 18 + 5;
      current = Math.min(current + increment, 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("portfolio_loaded", "1");
          }, 900);
        }, 400);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="loader"
          className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-colors duration-300 ${isDark ? "bg-black" : "bg-zinc-50"}`}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="mb-12 flex items-center gap-4"
          >
            <img
              src={publicPath(isDark ? "/logo white.png" : "/logo black.png")}
              alt="Zeinz Logo"
              width={45}
              height={45}
              className="object-contain"
            />
            <span
              className={`text-5xl sm:text-6xl font-bold tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Zeinz
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className={`w-56 h-px relative overflow-hidden ${isDark ? "bg-white/15" : "bg-black/10"}`}>
            <motion.div
              className={`absolute inset-y-0 left-0 ${isDark ? "bg-white" : "bg-black"}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.15 }}
            />
          </div>

          {/* Counter */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`mt-5 text-xs font-mono tracking-widest ${isDark ? "text-white/30" : "text-black/30"}`}
          >
            {String(Math.min(Math.floor(progress), 100)).padStart(3, "0")}
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
