"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { Mail, MessageCircle, Send, Github, Linkedin, Instagram } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { publicPath } from "@/lib/paths";
import { SOCIAL_LINKS } from "@/data/social";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const DiscordIcon = ({
  size = 24,
  className = "",
}: {
  size?: number | string;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
  </svg>
);

const MARQUEE_ITEMS = [
  "Available for Collaboration",
  "Let's Build Something",
  "Open for Freelance Projects",
  "Web & Mobile Development",
  "Creative Digital Solutions",
  "Contact Me Anytime",
];

// ─── Icon Map ──────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ size?: number | string; strokeWidth?: number; className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  discord: DiscordIcon,
};


// ─── Cycling Word ────────────────────────────────────────────────────────────

const CYCLING_WORDS = [
  "Together.",
  "Boldly.",
  "Creatively.",
  "Freely.",
  "Greatly.",
  "Endlessly.",
];

const CyclingWord = ({ colorClass }: { colorClass: string }) => {
  const [index, setIndex] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % CYCLING_WORDS.length);
        setFlashing(true);
        setVisible(true);
        // Remove flash after brief moment
        setTimeout(() => setFlashing(false), 600);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={cn(
        "inline-block",
        "transition-all duration-300",
        flashing ? "text-violet-400" : colorClass,
      )}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition:
          "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1), color 0.4s ease",
      }}
    >
      {CYCLING_WORDS[index]}
    </span>
  );
};

// ─── Magnetic Wrapper ─────────────────────────────────────────────────────────

const MagneticWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.38;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.38;
      el.style.transition = "transform 0.08s linear";
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const onLeave = () => {
      el.style.transition = "transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)";
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

// ─── Infinite Marquee ─────────────────────────────────────────────────────────

const MarqueeRow = ({ isDark }: { isDark: boolean }) => {
  const tripled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className={cn(
        "overflow-hidden border-b",
        "transition-colors duration-500",
        isDark ? "border-white/[0.05]" : "border-zinc-200",
      )}
    >
      <div className="flex w-max animate-marquee py-3.5">
        {tripled.map((item, i) => (
          <span
            key={i}
            className={cn(
              "flex items-center gap-3.5 pr-12",
              "text-[12px] font-medium tracking-[0.08em] uppercase whitespace-nowrap",
              "transition-colors duration-500",
              isDark ? "text-white/20" : "text-zinc-400",
            )}
          >
            <span
              className={cn(
                "w-[3px] h-[3px] rounded-full flex-shrink-0",
                isDark ? "bg-white/20" : "bg-zinc-300",
              )}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Aurora Blobs ─────────────────────────────────────────────────────────────

const AuroraBackground = ({ isDark }: { isDark: boolean }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div
      className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-700"
      style={{
        background: isDark
          ? "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
      }}
    />
    <div
      className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-700"
      style={{
        background: isDark
          ? "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)",
      }}
    />
    <div
      className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] transition-all duration-700"
      style={{
        background: isDark
          ? "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)",
      }}
    />
  </div>
);

// ─── Grid Overlay ─────────────────────────────────────────────────────────────

const GridOverlay = ({ isDark }: { isDark: boolean }) => (
  <div
    className="absolute inset-0 pointer-events-none transition-all duration-500"
    style={{
      backgroundImage: isDark
        ? `linear-gradient(rgba(255,255,255,0.032) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.032) 1px, transparent 1px)`
        : `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
      backgroundSize: "64px 64px",
    }}
  />
);

// ─── Contact Form ────────────────────────────────────────────

const ContactForm = ({ isDark }: { isDark: boolean }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Invalid email";
    if (!message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:aliffahriaditya10@gmail.com?subject=Portfolio Contact&body=${encodeURIComponent(body)}`;
    setName("");
    setEmail("");
    setMessage("");
  };

  const inputBase = cn(
    "w-full px-4 py-3 rounded-xl",
    "text-sm border",
    "backdrop-blur-sm transition-all duration-300 outline-none",
    isDark
      ? "bg-white/[0.04] border-white/[0.10] text-white placeholder-white/30 focus:border-violet-500/50"
      : "bg-zinc-900/[0.04] border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:border-violet-500/50",
  );

  const labelBase = cn(
    "text-[11px] font-medium tracking-wide mb-1.5 block",
    isDark ? "text-white/50" : "text-zinc-500",
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-md mx-auto mb-10 space-y-4"
    >
      <div>
        <label htmlFor="contact-name" className={labelBase}>
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((p) => ({ ...p, name: "" }));
          }}
          placeholder="Your name"
          className={inputBase}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor="contact-email" className={labelBase}>
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((p) => ({ ...p, email: "" }));
          }}
          placeholder="your@email.com"
          className={inputBase}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="contact-message" className={labelBase}>
          Message
        </label>
        <textarea
          id="contact-message"
          rows={3}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setErrors((p) => ({ ...p, message: "" }));
          }}
          placeholder="Your message..."
          className={cn(inputBase, "resize-none")}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>
        )}
      </div>
      <button
        type="submit"
        className={cn(
          "w-full flex items-center justify-center gap-2",
          "px-8 py-3.5 rounded-full border",
          "font-semibold backdrop-blur-md",
          "transition-all duration-300 text-[13px] tracking-wide",
          isDark
            ? "bg-white/[0.08] border-white/[0.13] text-white hover:bg-white/[0.15] hover:border-white/[0.25]"
            : "bg-zinc-900/[0.06] border-zinc-200 text-zinc-800 hover:bg-zinc-900/[0.10] hover:border-zinc-400",
        )}
      >
        <Send size={15} />
        Send Message
      </button>
    </form>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const CinematicFooter = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const outerRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!outerRef.current || !revealRef.current) return;

      ctx = gsap.context(() => {
        // ── Curtain reveal — clip-path scrub ──
        gsap.fromTo(
          revealRef.current,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: outerRef.current,
              start: "top 88%",
              end: "top 8%",
              scrub: 2.5,
            },
          },
        );

        // ── Giant text parallax ──
        if (bgTextRef.current) {
          gsap.fromTo(
            bgTextRef.current,
            { y: 100 },
            {
              y: -100,
              ease: "none",
              scrollTrigger: {
                trigger: outerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        }

        // ── Staggered content reveal ──
        const tl = gsap.timeline({
          scrollTrigger: { trigger: outerRef.current, start: "top 35%" },
        });

        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
        )
          .fromTo(
            buttonsRef.current,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
            "-=0.6",
          )
          .fromTo(
            bottomRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.7, ease: "power2.out" },
            "-=0.3",
          );
      }, outerRef);
    };

    init();
    return () => ctx?.revert();
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section
      id="contact"
      ref={outerRef}
      className={cn(
        "relative min-h-screen",
        "transition-colors duration-500",
        isDark ? "bg-zinc-950" : "bg-white",
      )}
    >
      {/* Permanent backdrop — visible before curtain reveals */}
      <div
        className={cn(
          "absolute inset-0",
          "transition-colors duration-500",
          isDark ? "bg-zinc-950" : "bg-white",
        )}
      />

      {/* ── Curtain-revealed layer ── */}
      <div
        ref={revealRef}
        className={cn(
          "relative min-h-screen flex flex-col overflow-hidden",
          "transition-colors duration-500",
          isDark ? "bg-zinc-950" : "bg-white",
        )}
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
      >
        {/* Background layers */}
        <AuroraBackground isDark={isDark} />
        <GridOverlay isDark={isDark} />

        {/* ── Top marquee ── */}
        <MarqueeRow isDark={isDark} />

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-14 md:py-20 pb-56 md:pb-64 relative z-10">
          {/* Eyebrow label */}
          <p
            className={cn(
              "text-[10px] font-semibold tracking-[0.28em] uppercase mb-7",
              "text-violet-500",
            )}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get in Touch
          </p>

          {/* ── Heading ── */}
          <h2
            ref={headingRef}
            className={cn(
              "text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]",
              "font-bold text-center leading-[1.0] mb-4",
            )}
            style={{ fontFamily: "'Playfair Display', serif", opacity: 0 }}
          >
            <span className={cn(
              "transition-colors duration-500",
              isDark ? "text-white" : "text-zinc-900",
            )}>
              Let&apos;s Work
            </span>
            <br />
            <CyclingWord
              colorClass={cn(
                "transition-colors duration-500",
                isDark ? "text-white/35" : "text-zinc-400",
              )}
            />
          </h2>

          {/* Divider */}
          <div
            className={cn(
              "w-10 h-px mb-10",
              "transition-colors duration-500",
              isDark ? "bg-white/15" : "bg-zinc-200",
            )}
          />

          {/* ── Contact Form ── */}
          <ContactForm isDark={isDark} />

          {/* ── Primary magnetic buttons ── */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 mb-12"
            style={{ opacity: 0 }}
          >
            {/* Send Email */}
            <MagneticWrapper>
              <a
                href="mailto:aliffahriaditya10@gmail.com"
                className={cn(
                  "group flex items-center gap-3",
                  "px-8 py-4 rounded-full border",
                  "font-semibold backdrop-blur-md",
                  "transition-all duration-300 text-[13px] tracking-wide",
                  isDark
                    ? "bg-white/[0.08] border-white/[0.13] text-white hover:bg-white/[0.15] hover:border-white/[0.25]"
                    : "bg-zinc-900/[0.06] border-zinc-200 text-zinc-800 hover:bg-zinc-900/[0.10] hover:border-zinc-400",
                )}
              >
                <Mail
                  size={15}
                  className={cn(
                    "transition-colors duration-200",
                    isDark
                      ? "text-white/55 group-hover:text-white"
                      : "text-zinc-500 group-hover:text-zinc-900",
                  )}
                />
                Send Email
              </a>
            </MagneticWrapper>

            {/* WhatsApp Me */}
            <MagneticWrapper>
              <a
                href="https://wa.me/6285285944423"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex items-center gap-3",
                  "px-8 py-4 rounded-full border",
                  "font-semibold backdrop-blur-md",
                  "transition-all duration-300 text-[13px] tracking-wide",
                  isDark
                    ? "bg-white/[0.08] border-white/[0.13] text-white hover:bg-white/[0.15] hover:border-white/[0.25]"
                    : "bg-zinc-900/[0.06] border-zinc-200 text-zinc-800 hover:bg-zinc-900/[0.10] hover:border-zinc-400",
                )}
              >
                <MessageCircle
                  size={15}
                  className={cn(
                    "transition-colors duration-200",
                    isDark
                      ? "text-white/55 group-hover:text-white"
                      : "text-zinc-500 group-hover:text-zinc-900",
                  )}
                />
                WhatsApp Me
              </a>
            </MagneticWrapper>
          </div>
        </div>

        {/* Spotlight Glow for Giant Name Text */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[60vh] pointer-events-none z-0"
          style={{
            background: isDark
              ? "radial-gradient(ellipse at bottom, rgba(139,92,246,0.15) 0%, transparent 60%)"
              : "radial-gradient(ellipse at bottom, rgba(139,92,246,0.12) 0%, transparent 60%)",
          }}
        />

        {/* Giant Name Text at bottom (Background layer) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden z-0">
          <span
            ref={bgTextRef}
            className={cn(
              "font-bold leading-none tracking-[-0.04em] whitespace-nowrap",
              "transition-colors duration-500",
              isDark ? "text-white/[0.03]" : "text-black/[0.03]",
            )}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(120px, 24vw, 400px)",
            }}
          >
            Zeinz
          </span>
        </div>

        {/* ── Bottom Layout ── */}
        <div
          ref={bottomRef}
          className={cn(
            "absolute bottom-0 left-0 right-0 z-10",
            "w-full max-w-7xl mx-auto",
            "px-5 sm:px-10 pb-8 md:pb-10 pt-0",
            "flex flex-col md:flex-row justify-between items-start gap-6 md:gap-10",
          )}
          style={{ opacity: 0 }}
        >
          {/* Left Side: Logo, Nav, Copyright */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div
              className={cn(
                "flex items-center gap-2.5",
                "transition-colors duration-500",
                isDark ? "text-white" : "text-zinc-900",
              )}
            >
              <img
                src={publicPath(isDark ? "/logo white.png" : "/logo black.png")}
                alt="Zeinz Logo"
                width={22}
                height={22}
                className="object-contain"
              />
              <span
                className="text-2xl font-bold tracking-tighter"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Zeinz
              </span>
            </div>

            {/* Nav Links */}
            <div
              className={cn(
                "flex flex-wrap items-center gap-4 sm:gap-5",
                "text-[13px] font-medium",
                "transition-colors duration-500",
                isDark ? "text-white/60" : "text-zinc-500",
              )}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <button
                onClick={() => scrollToTop()}
                className="hover:text-violet-500 transition-colors"
              >
                Home
              </button>
              <a
                href="#about"
                className="hover:text-violet-500 transition-colors"
              >
                About
              </a>
              <a
                href="#skills"
                className="hover:text-violet-500 transition-colors"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="hover:text-violet-500 transition-colors"
              >
                Projects
              </a>
            </div>

            {/* Copyright */}
            <span
              className={cn(
                "text-[12px] mt-6",
                "transition-colors duration-500",
                isDark ? "text-white/25" : "text-zinc-400",
              )}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              © {new Date().getFullYear()} Zeinz. All rights reserved.
            </span>
          </div>

          {/* Right Side: Social Icons */}
          <div className="flex items-center gap-6 md:mt-2">
            {SOCIAL_LINKS.map(({ label, href, icon }) => {
              const Icon = ICON_MAP[icon];
              if (!Icon) return null;
              return (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={cn(
                    "transition-colors duration-300",
                    isDark ? "text-white/40 hover:text-white" : "text-zinc-400 hover:text-zinc-900",
                  )}
                  aria-label={label}
                >
                  <Icon size={18} strokeWidth={2} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
