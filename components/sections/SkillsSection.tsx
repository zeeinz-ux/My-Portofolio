"use client";

import { useRef, useEffect } from "react";
import { SKILLS } from "@/data/skills";
import { useTheme } from "@/providers/ThemeProvider";

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        // Sticky text fade in
        gsap.fromTo(
          ".skills-sticky-header",
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          },
        );

        // Animate each category block
        const blocks = gsap.utils.toArray<HTMLElement>(".skill-block");
        blocks.forEach((block) => {
          const number = block.querySelector(".skill-num");
          const title = block.querySelector(".skill-title");
          const line = block.querySelector(".skill-line");
          const pills = block.querySelectorAll(".skill-pill");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
            },
          });

          tl.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power3.inOut",
              transformOrigin: "left center",
            },
          )
            .fromTo(
              number,
              { opacity: 0, y: 20 },
              { opacity: 0.2, y: 0, duration: 0.5, ease: "power2.out" },
              "-=0.4",
            )
            .fromTo(
              title,
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
              "-=0.3",
            )
            .fromTo(
              pills,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.05,
                ease: "back.out(1.5)",
              },
              "-=0.2",
            );
        });
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  const textColor = isDark ? "text-white" : "text-zinc-900";
  const mutedColor = isDark ? "text-white/50" : "text-zinc-500";
  const borderColor = isDark ? "border-white/10" : "border-zinc-200";

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`relative py-20 md:py-32 px-5 sm:px-6 transition-colors duration-500 ${
        isDark ? "bg-zinc-950" : "bg-white"
      }`}
    >
      <div ref={containerRef} className="max-w-7xl mx-auto">
        {/* Mobile Header (visible only on mobile) */}
        <div className="lg:hidden mb-12">
          <p
            className="text-[10px] font-bold tracking-[0.3em] text-violet-500 uppercase mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Capabilities
          </p>
          <h2
            className={`text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight ${textColor}`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Tools of
            <br />
            the Trade.
          </h2>
          <p
            className={`mt-5 text-sm leading-relaxed ${mutedColor}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A versatile and evolving stack of technologies I use to build
            scalable, high-performance, and visually stunning applications.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left: Sticky Header - Desktop only */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="sticky top-40 skills-sticky-header">
              <p
                className="text-xs font-bold tracking-[0.2em] text-violet-500 uppercase mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Capabilities
              </p>
              <h2
                className={`text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight ${textColor}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Tools of
                <br />
                the Trade.
              </h2>
              <p
                className={`mt-8 text-sm leading-relaxed max-w-sm ${mutedColor}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                A versatile and evolving stack of technologies I use to build
                scalable, high-performance, and visually stunning applications.
              </p>
            </div>
          </div>

          {/* Right: Skills List */}
          <div className="lg:w-2/3 flex flex-col">
            {SKILLS.map((category, i) => (
              <div
                key={i}
                className="skill-block relative flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 pb-8 md:pb-12 pt-4 md:pt-6 group"
              >
                {/* Divider Line */}
                <div
                  className={`skill-line absolute top-0 left-0 w-full h-px ${isDark ? "bg-white/10" : "bg-zinc-200"}`}
                />

                {/* Category Info */}
                <div className="sm:w-1/3 flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0">
                  <span
                    className={`skill-num text-4xl sm:text-5xl md:text-6xl font-light mb-0 sm:mb-2 transition-colors duration-300 group-hover:text-violet-500 ${textColor}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`skill-title text-lg sm:text-xl font-bold tracking-tight ${textColor}`}
                  >
                    {category.name}
                  </h3>
                </div>

                {/* Skill Items (Compact & Optional Marquee) */}
                <div className="sm:w-2/3 flex relative overflow-hidden pt-1 sm:pt-2">
                  {category.skills.length >= 6 ? (
                    // Marquee layout for many skills (using 3 copies for smooth calc(-100%/3) animation)
                    <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                      {[...Array(3)].map((_, copyIdx) => (
                        <div key={copyIdx} className="flex gap-x-8 pr-8">
                          {category.skills.map((skill, j) => (
                            <div
                              key={j}
                              className="skill-pill flex items-center gap-2.5 group/skill cursor-default whitespace-nowrap"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={
                                  skill.icon === "vscode"
                                    ? "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
                                    : `https://cdn.simpleicons.org/${skill.icon}/${isDark ? "white" : "333333"}`
                                }
                                alt={skill.name}
                                className={`w-5 h-5 opacity-50 group-hover/skill:opacity-100 transition-opacity duration-300 ${skill.icon === "vscode" && !isDark ? "grayscale" : ""}`}
                              />
                              <span
                                className="text-base font-medium text-zinc-500 group-hover/skill:text-zinc-900 dark:text-zinc-400 dark:group-hover/skill:text-white transition-colors duration-300"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                              >
                                {skill.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Standard flex layout for fewer skills
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                      {category.skills.map((skill, j) => (
                        <div
                          key={j}
                          className="skill-pill flex items-center gap-2.5 group/skill cursor-default whitespace-nowrap"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={
                              skill.icon === "vscode"
                                ? "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"
                                : `https://cdn.simpleicons.org/${skill.icon}/${isDark ? "white" : "333333"}`
                            }
                            alt={skill.name}
                            className={`w-5 h-5 opacity-50 group-hover/skill:opacity-100 transition-opacity duration-300 ${skill.icon === "vscode" && !isDark ? "grayscale" : ""}`}
                          />
                          <span
                            className="text-base font-medium text-zinc-500 group-hover/skill:text-zinc-900 dark:text-zinc-400 dark:group-hover/skill:text-white transition-colors duration-300"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
