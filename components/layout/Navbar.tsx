"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { publicPath } from "@/lib/paths";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <motion.div
          layout
          transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className={cn(
            "pointer-events-auto flex items-center justify-between border",
            "transition-all duration-500",
            scrolled
              ? cn(
                  "mt-4 rounded-full px-6 py-3 shadow-2xl w-[92%] md:w-auto md:gap-12",
                  isDark ? "bg-zinc-950/80 border-white/[0.12]" : "bg-white/80 border-black/[0.08]",
                )
              : "w-full max-w-7xl px-6 py-5 rounded-none border-transparent bg-transparent mt-0 md:w-full",
          )}
          style={{
            backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
            WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
            transition: "backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className={cn(
              "flex items-center gap-2.5 transition-opacity hover:opacity-70",
              isDark ? "text-white" : "text-zinc-900",
            )}
          >
            <img
              src={publicPath(isDark ? "/logo white.png" : "/logo black.png")}
              alt="Zeinz Logo"
              width={20}
              height={20}
              className="object-contain"
            />
            <span
              className="text-lg font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Zeinz
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                className={cn(
                  "text-sm font-medium tracking-wide transition-all duration-200",
                  activeSection === link.id
                    ? cn(
                        isDark ? "text-white" : "text-zinc-900",
                        "opacity-100",
                      )
                    : cn(
                        isDark ? "text-white/45" : "text-zinc-500",
                        isDark ? "hover:text-white" : "hover:text-zinc-900",
                        "hover:opacity-100",
                      ),
                )}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Theme toggle + burger */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={cn(
                "p-2 rounded-full border transition-all duration-300",
                isDark
                  ? "border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                  : "border-zinc-300 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
              )}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </motion.div>
            </button>

            <button
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(
                "md:hidden p-2 transition-colors",
                isDark ? "text-white" : "text-zinc-900",
              )}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className={cn(
              "fixed inset-0 z-40",
              "flex flex-col items-center justify-center gap-10",
              isDark ? "bg-zinc-950" : "bg-white",
            )}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                className={cn(
                  "text-5xl font-bold transition-colors",
                  isDark ? "text-white hover:text-white/60" : "text-zinc-900 hover:text-zinc-400",
                )}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={toggleTheme}
              className={cn(
                "mt-4 flex items-center gap-2 text-sm",
                isDark ? "text-white/40" : "text-zinc-400",
              )}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
              <span style={{ fontFamily: "'Inter', sans-serif" }}>
                {isDark ? "Switch to Light" : "Switch to Dark"}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
