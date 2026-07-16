"use client";

import { useRef, useEffect } from "react";
import { ExternalLink, Github, BookOpen } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { cn } from "@/lib/utils";

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".projects-heading",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".projects-heading",
              start: "top 85%",
            },
          }
        );

        gsap.utils.toArray<HTMLElement>(".project-row").forEach((row) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 82%" },
            }
          );
        });
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={cn(
        "py-28 md:py-36 px-6",
        "bg-white dark:bg-zinc-950",
        "text-zinc-900 dark:text-white",
        "transition-colors duration-500",
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-violet-500 uppercase mb-4">
            Selected Work
          </p>
          <h2
            className={cn(
              "projects-heading",
              "text-3xl sm:text-4xl lg:text-6xl font-bold",
              "opacity-0",
            )}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Projects
          </h2>
        </div>

        {/* Project rows */}
        <div className="space-y-28 md:space-y-36">
          {PROJECTS.map((project, i) => (
            <div
              key={i}
              className={cn(
                "project-row opacity-0",
                "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center",
              )}
            >
              {/* ── Project Visual ── */}
              <div
                data-cursor="view"
                className={cn(
                  "relative aspect-video overflow-hidden rounded-2xl",
                  "group cursor-none",
                  i % 2 === 1 && "lg:order-last",
                )}
              >
                {/* Project Image or Fallback Gradient */}
                {project.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <>
                    {/* Gradient bg */}
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      style={{ background: project.gradient }}
                    />

                    {/* Grid pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `linear-gradient(${project.accentColor}40 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}40 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                      }}
                    />
                  </>
                )}

                {/* Project number */}
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 font-mono text-6xl md:text-8xl font-bold leading-none select-none pointer-events-none opacity-20 text-white">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Accent line */}
                <div
                  className="absolute top-6 left-6 w-8 h-0.5"
                  style={{ backgroundColor: project.accentColor }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                  <span className="text-white text-xs font-bold tracking-[0.2em] border border-white/50 rounded-full px-5 py-2 uppercase">
                    View Project
                  </span>
                </div>
              </div>

              {/* ── Project Text ── */}
              <div className={cn(i % 2 === 1 ? "lg:pr-4" : "lg:pl-4")}>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono mb-3 tracking-widest">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(PROJECTS.length).padStart(2, "0")}
                </p>

                <h3
                  className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 md:mb-5 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {project.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-7 text-[15px]">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, j) => (
                    <span
                      key={j}
                      className={cn(
                        "text-[11px] px-3 py-1 rounded-full",
                        "bg-zinc-100 dark:bg-white/[0.07]",
                        "text-zinc-600 dark:text-zinc-400",
                        "border border-zinc-200 dark:border-white/10",
                        "font-medium",
                      )}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-6">
                  {project.demoUrl && project.demoUrl !== "#" && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2",
                        "text-sm font-medium",
                        "text-zinc-700 dark:text-zinc-300",
                        "hover:text-zinc-900 dark:hover:text-white",
                        "transition-colors underline-offset-4 hover:underline",
                      )}
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && project.githubUrl !== "#" && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2",
                        "text-sm font-medium",
                        "text-zinc-700 dark:text-zinc-300",
                        "hover:text-zinc-900 dark:hover:text-white",
                        "transition-colors underline-offset-4 hover:underline",
                      )}
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                  )}
                  {project.caseStudyUrl && project.caseStudyUrl !== "#" && (
                    <a
                      href={project.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2",
                        "text-sm font-medium",
                        "text-zinc-700 dark:text-zinc-300",
                        "hover:text-zinc-900 dark:hover:text-white",
                        "transition-colors underline-offset-4 hover:underline",
                      )}
                    >
                      <BookOpen size={14} />
                      Case Study
                    </a>
                  )}
                  {/* Fallback placeholder links */}
                  {project.demoUrl === "#" && (
                    <span className={cn(
                      "flex items-center gap-2 text-sm",
                      "text-zinc-400 dark:text-zinc-600",
                    )}>
                      <ExternalLink size={14} />
                      Demo coming soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
