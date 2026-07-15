import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CinematicFooter } from "@/components/ui/cinematic-footer";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function HomePage() {
  return (
    <main>
      <LoadingScreen />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CinematicFooter />
    </main>
  );
}
