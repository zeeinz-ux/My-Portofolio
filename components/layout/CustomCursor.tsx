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
  const isPointerRef = useRef(false);
  const isViewRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setIsHidden(false);

      const target = e.target as Element;
      const clickable = target.closest("a, button, [role='button'], input, textarea, select");
      const viewEl = target.closest("[data-cursor='view']");

      isPointerRef.current = !!clickable;
      isViewRef.current = !!viewEl;
      setIsPointer(!!clickable);
      setIsView(!!viewEl);
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    let rafId: number;
    let ringX = 0;
    let ringY = 0;

    const animateRing = () => {
      ringX += (pos.current.x - ringX) * 0.12;
      ringY += (pos.current.y - ringY) * 0.12;

      dot.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;

      const size = isViewRef.current ? 60 : isPointerRef.current ? 36 : 20;
      ring.style.transform = `translate(${ringX - size / 2}px, ${ringY - size / 2}px)`;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;

      rafId = requestAnimationFrame(animateRing);
    };

    rafId = requestAnimationFrame(animateRing);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 z-[300] pointer-events-none w-2.5 h-2.5 rounded-full bg-white mix-blend-difference transition-opacity duration-200 ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />

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
