"use client";

import { useRef, useEffect } from "react";
import {
  Download,
  ArrowRight,
  MapPin,
  GraduationCap,
  Code2,
  Zap,
} from "lucide-react";

const INFO_ITEMS = [
  { Icon: MapPin, label: "Location", value: "Indonesia" },
  { Icon: GraduationCap, label: "Education", value: "Information Systems" },
  { Icon: Code2, label: "Focus", value: "Web & Mobile Dev" },
  { Icon: Zap, label: "Status", value: "Open to Work" },
];

const TIMELINE = [
  {
    year: "2023",
    title: "Started University",
    desc: "Enrolled in Information Systems",
  },
  {
    year: "2024",
    title: "First Web Project",
    desc: "Built PHP Native web applications",
  },
  {
    year: "2025",
    title: "Expanded Stack",
    desc: "Laravel, CodeIgniter 4 & Flutter",
  },
  {
    year: "2026",
    title: "Modern Frontend",
    desc: "React, Next.js & TypeScript",
  },
];

const HEADING = "Crafting digital experiences with purpose.";

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        // Image clip-path reveal
        if (imageWrapRef.current) {
          gsap.fromTo(
            imageWrapRef.current,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.4,
              ease: "power4.inOut",
              scrollTrigger: {
                trigger: imageWrapRef.current,
                start: "top 82%",
              },
            },
          );
        }

        // Heading words
        gsap.fromTo(
          ".about-word",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".about-heading", start: "top 82%" },
          },
        );

        // Fade-up elements
        gsap.fromTo(
          ".about-fade",
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: ".about-bio-block", start: "top 82%" },
          },
        );

        // Timeline
        gsap.fromTo(
          ".timeline-item",
          { opacity: 0, x: -18 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.12,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: ".timeline-block", start: "top 85%" },
          },
        );
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-28 md:py-36 px-6 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-start">
          {/* ── Portrait ── */}
          <div className="lg:sticky lg:top-28">
            <div
              ref={imageWrapRef}
              className="relative aspect-[4/3] sm:aspect-[4/4] lg:aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-900"
              style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            >
              {/* Stylised portrait placeholder — replace src with real photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.png"
                alt="Zeinz"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
                className="absolute inset-0 z-10 w-full h-full object-cover dark:grayscale transition-all duration-700"
              />

              {/* Text overlay on top of photo */}
              <div className="absolute inset-0 z-20 flex items-end p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <div>
                  <p
                    className="text-4xl font-bold text-zinc-900 dark:text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    More Than Just a Developer
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    Exploring the intersection of .{" "}
                    <code className="text-zinc-800 dark:text-zinc-300">
                      technology, business logic, and everyday life adventures
                    </code>
                  </p>
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* ── Text ── */}
          <div>
            <p className="about-fade text-xs font-semibold tracking-[0.2em] text-violet-500 uppercase mb-6 opacity-0">
              About Me
            </p>

            <h2
              className="about-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] mb-8 md:mb-10"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {HEADING.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="about-word inline-block mr-[0.25em] opacity-0"
                >
                  {word}
                </span>
              ))}
            </h2>

            <div className="about-bio-block">
              <p className="about-fade text-base lg:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-10 opacity-0">
                I&apos;m zeeinz an Information Systems student and full-stack
                developer from Indonesia passionate about building clean,
                performant, and visually compelling digital products. I
                specialize in web and mobile development, from backend APIs to
                polished frontends, with a strong eye for design.
              </p>

              {/* Info Pills */}
              <div className="about-fade grid grid-cols-2 gap-3 mb-10 opacity-0">
                {INFO_ITEMS.map(({ Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 p-4 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 transition-colors duration-500"
                  >
                    <Icon
                      size={15}
                      className="text-zinc-400 dark:text-zinc-500 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mb-0.5 uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="about-fade flex flex-wrap gap-4 mb-16 opacity-0">
                <a
                  href="/cv.pdf"
                  download
                  className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-full text-sm font-medium hover:bg-violet-700 transition-colors"
                >
                  <Download size={14} />
                  Download CV
                </a>
                <button
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-white/20 text-zinc-900 dark:text-white rounded-full text-sm font-medium hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                >
                  View Projects
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="timeline-block">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-zinc-400 dark:text-zinc-500 uppercase mb-6">
                Journey
              </p>
              <div className="space-y-0">
                {TIMELINE.map((item, i) => (
                  <div key={i} className="timeline-item flex gap-5 opacity-0">
                    {/* Line + dot */}
                    <div className="flex flex-col items-center pt-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 flex-shrink-0" />
                      {i < TIMELINE.length - 1 && (
                        <div className="w-px flex-1 bg-zinc-200 dark:bg-white/10 my-2" />
                      )}
                    </div>
                    <div className="pb-7">
                      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mb-0.5 font-mono">
                        {item.year}
                      </p>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
