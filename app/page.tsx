import HeroSection from "@/components/sections/HeroSection";
import ProfileParallax from "@/components/sections/ProfileParallax";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import InterestsSection from "@/components/sections/InterestsSection";
import PublicationsSection from "@/components/sections/PublicationsSection";
import ExtraCurricularSection from "@/components/sections/ExtraCurricularSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ProfileParallax />
      <SkillsSection />
      <ProjectsSection />
      <PublicationsSection />
      <ExtraCurricularSection />
      <InterestsSection />
      <Footer />
    </div>
  );
}
