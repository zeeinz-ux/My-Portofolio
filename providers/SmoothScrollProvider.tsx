"use client";

import { useEffect } from "react";

export const SmoothScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    let lenis: InstanceType<typeof import("lenis").default> | null = null;

    const init = async () => {
      const { default: Lenis } = await import("lenis");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      // Connect Lenis to GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time: number) => {
        lenis!.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    };

    init();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return <>{children}</>;
};
