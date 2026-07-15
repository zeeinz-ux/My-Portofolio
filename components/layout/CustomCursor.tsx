"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only activate on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setIsHidden(false);

      // Dot — instant
      dot.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;

      const target = e.target as Element;
      const clickable = target.closest("a, button, [role='button'], input, textarea, select");
      const viewEl = target.closest("[data-cursor='view']");

      setIsPointer(!!clickable);
      setIsView(!!viewEl);
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    // Ring follows with slight lag via requestAnimationFrame
    let rafId: number;
    let ringX = 0;
    let ringY = 0;

    const animateRing = () => {
      ringX += (pos.current.x - ringX) * 0.12;
      ringY += (pos.current.y - ringY) * 0.12;

      const size = isView ? 60 : isPointer ? 36 : 20;
      if (ring) {
        ring.style.transform = `translate(${ringX - size / 2}px, ${ringY - size / 2}px)`;
        ring.style.width = `${size}px`;
        ring.style.height = `${size}px`;
      }

      rafId = requestAnimationFrame(animateRing);
    };

    rafId = requestAnimationFrame(animateRing);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isPointer, isView]);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 z-[300] pointer-events-none w-2.5 h-2.5 rounded-full bg-white mix-blend-difference transition-opacity duration-200 ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 z-[299] pointer-events-none rounded-full border border-white/60 transition-all duration-200 flex items-center justify-center ${
          isHidden ? "opacity-0" : isPointer || isView ? "opacity-100" : "opacity-50"
        }`}
        style={{ willChange: "transform, width, height" }}
      >
        {isView && (
          <span className="text-white text-[9px] font-bold tracking-[0.15em] select-none">
            VIEW
          </span>
        )}
      </div>
    </>
  );
};
