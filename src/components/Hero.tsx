import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Mail } from "lucide-react";

const titles = [
"Full Stack Developer",
"AI Engineer",
"DevOps-Oriented Builder",
"Data Analyst"];


const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((i) => (i + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding pt-32">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] animate-pulse-slow" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>

          



        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6">

          <span className="text-foreground">Ahmed</span>{" "}
          <span className="text-gradient">Khanji</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-10 mb-8">

          <span key={titleIndex} className="text-xl sm:text-2xl text-muted-foreground font-medium inline-block animate-[fade-in_0.5s_ease-out]">
            {titles[titleIndex]}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">

          Building scalable systems, intelligent agents, and production-grade platforms. 
          Specializing in MERN, Django, FastAPI, and AI-powered backend systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <a
            href="#projects"
            className="bg-gradient-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-all flex items-center gap-2 glow-primary">

            View Projects <ExternalLink size={16} />
          </a>
          <a
            href="#contact"
            className="border border-border bg-secondary/50 text-foreground px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-secondary transition-all flex items-center gap-2">

            Contact Me <Mail size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16">

          <ArrowDown size={20} className="text-muted-foreground animate-bounce mx-auto" />
        </motion.div>
      </div>
    </section>);

};

export default Hero;