"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import * as THREE from "three";
import { useTheme } from "@/providers/ThemeProvider";

interface WovenLightHeroProps {
  onExplore?: () => void;
}

// --- Main Hero Component ---
export const WovenLightHero = ({ onExplore }: WovenLightHeroProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    textControls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.025 + 1.2,
        duration: 0.9,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }));
    buttonControls.start({
      opacity: 1,
      transition: { delay: 1.8, duration: 0.8 },
    });
  }, [textControls, buttonControls]);

  const headlineLines = ["Zeinz", "Full-Stack Developer"];

  return (
    <div
      className={`relative flex h-screen w-full flex-col items-center justify-center overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-zinc-950" : "bg-white"
      }`}
    >
      {/* ── Three.js canvas ── */}
      <WovenCanvas />

      {/* ── Purple spotlight overlay (adapts intensity to theme) ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)"
            : "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.09) 0%, transparent 70%)",
        }}
      />

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Text content ── */}
      <div className="relative z-10 text-center px-5 sm:px-8">
        <h1
          className={`text-5xl sm:text-6xl md:text-8xl font-bold leading-[1.1] ${
            isDark ? "text-white" : "text-zinc-900"
          }`}
          style={{
            fontFamily: "'Playfair Display', serif",
            textShadow: isDark
              ? "0 0 50px rgba(255,255,255,0.2)"
              : "0 0 50px rgba(0,0,0,0.08)",
          }}
        >
          {headlineLines.map((line, lineIndex) => (
            <div key={lineIndex} className="block">
              {line.split(" ").map((word, i) => (
                <span key={i} className="inline-block">
                  {word.split("").map((char, j) => (
                    <motion.span
                      key={j}
                      custom={(lineIndex * 20) + (i * 10) + j}
                      initial={{ opacity: 0, y: 50 }}
                      animate={textControls}
                      style={{ display: "inline-block" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {i < line.split(" ").length - 1 && <span>&nbsp;</span>}
                </span>
              ))}
            </div>
          ))}
        </h1>

        <motion.p
          custom={10}
          initial={{ opacity: 0, y: 30 }}
          animate={textControls}
          className={`mx-auto mt-4 md:mt-6 max-w-[90vw] md:max-w-xl text-base md:text-lg leading-relaxed ${
            isDark ? "text-zinc-300" : "text-zinc-700"
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Building scalable, high-performance web and mobile applications with clean code and creative design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={buttonControls}
          className="mt-10"
        >
          <button
            onClick={onExplore}
            className="rounded-full px-8 py-3 font-semibold text-sm transition-all bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/25"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Explore Portfolio
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// --- Three.js Canvas Component ---
const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 12000 : 45000;

    // Read initial theme from DOM
    const getIsDark = () =>
      document.documentElement.classList.contains("dark");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    // --- Build geometry ---
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    const buildColors = (isDark: boolean) => {
      for (let i = 0; i < particleCount; i++) {
        const c = new THREE.Color();
        // Use rich, vibrant colors for both modes so they don't wash out to white
        c.setHSL(Math.random(), 0.85, isDark ? 0.55 : 0.45);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      geometry.attributes.color.needsUpdate = true;
    };

    for (let i = 0; i < particleCount; i++) {
      const vi = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vi);
      const y = torusKnot.attributes.position.getY(vi);
      const z = torusKnot.attributes.position.getZ(vi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
      velocities[i * 3] = velocities[i * 3 + 1] = velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    let isDark = getIsDark();
    buildColors(isDark);

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.025 : 0.02,
      vertexColors: true,
      blending: THREE.NormalBlending, // Using NormalBlending prevents overlapping particles from washing out to pure white
      transparent: true,
      opacity: isDark ? 0.8 : 0.65,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Theme observer ---
    const observer = new MutationObserver(() => {
      isDark = getIsDark();
      material.opacity = isDark ? 0.8 : 0.65;
      material.needsUpdate = true;
      buildColors(isDark);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // --- Mouse ---
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    if (!isMobile) window.addEventListener("mousemove", handleMouseMove);

    // --- Pre-allocated vectors (avoid GC pressure) ---
    const mouseWorld = new THREE.Vector3();
    const currentPos = new THREE.Vector3();
    const originalPos = new THREE.Vector3();
    const velocityVec = new THREE.Vector3();
    const dirVec = new THREE.Vector3();
    const subVec = new THREE.Vector3();

    let animId: number;
    let isVisible = true;

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        clock.start();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();
      mouseWorld.set(mouse.x * 3, mouse.y * 3, 0);

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;

        currentPos.set(positions[ix], positions[iy], positions[iz]);
        originalPos.set(originalPositions[ix], originalPositions[iy], originalPositions[iz]);
        velocityVec.set(velocities[ix], velocities[iy], velocities[iz]);

        const dist = currentPos.distanceTo(mouseWorld);
        if (dist < 1.5) {
          const force = (1.5 - dist) * 0.01;
          dirVec.subVectors(currentPos, mouseWorld).normalize();
          velocityVec.add(dirVec.multiplyScalar(force));
        }

        subVec.subVectors(originalPos, currentPos).multiplyScalar(0.001);
        velocityVec.add(subVec);
        velocityVec.multiplyScalar(0.95);

        positions[ix] += velocityVec.x;
        positions[iy] += velocityVec.y;
        positions[iz] += velocityVec.z;
        velocities[ix] = velocityVec.x;
        velocities[iy] = velocityVec.y;
        velocities[iz] = velocityVec.z;
      }

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = elapsedTime * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    // --- Resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", handleResize);
      if (!isMobile) window.removeEventListener("mousemove", handleMouseMove);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      torusKnot.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};
