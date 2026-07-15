"use client";

import { motion } from "framer-motion";
import { WovenLightHero } from "@/components/ui/woven-light-hero";
import { ChevronDown } from "lucide-react";

export const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative">
      <WovenLightHero onExplore={scrollToAbout} />

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors"
        aria-label="Scroll down"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
};
