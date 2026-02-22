import Navigation from "@/components/Navigation";
import Particles from "@/components/Particles";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Demo from "@/components/Demo";
import TechStack from "@/components/TechStack";
import Certifications from "@/components/Certifications";
import Philosophy from "@/components/Philosophy";
import TerminalAnimation from "@/components/TerminalAnimation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="relative min-h-screen bg-background">
    <Particles />
    <Navigation />
    <main className="relative z-10">
      <Hero />
      <Experience />
      <Projects />
      <Demo />
      <TechStack />
      <Certifications />
      <Philosophy />
      <TerminalAnimation />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
