import { motion } from "framer-motion";
import { ExternalLink, GraduationCap, TrendingUp, Brain, BarChart3 } from "lucide-react";

const projects = [
  {
    title: "STEMConnect",
    description: "Real-time collaborative study platform with WebSocket chat, secure backend, and persistent storage. Hosted on AWS with 20+ active users.",
    tech: ["React", "Node.js", "Express", "MongoDB", "WebSocket", "AWS EC2", "S3"],
    icon: <GraduationCap className="text-primary" size={24} />,
    accent: "primary" as const,
    liveIndicator: true,
    link: "https://github.com/Ahmed-Khanji/STEMConnect.git",
  },
  {
    title: "KnowFlow",
    description: "Knowledge base platform enabling teams to upload documents and query them using AI-powered search. Integrated PDF and text processing pipelines. Doubled API performance with background tasks and caching.",
    tech: ["React", "FastAPI", "LangChain", "OpenAI", "ChromaDB", "Redis", "Docker", "AWS"],
    icon: <Brain className="text-primary" size={24} />,
    accent: "primary" as const,
    liveIndicator: false,
    link: "https://github.com/Ahmed-Khanji/KnowFlow.git",
  },
  {
    title: "Investment Strategy Dashboard",
    description: "PnL visualization, portfolio tracking, and API-driven performance updates with PostgreSQL backend and financial-tech inspired design.",
    tech: ["React", "Redux", "Django", "PostgreSQL", "Render"],
    icon: <TrendingUp className="text-accent" size={24} />,
    accent: "accent" as const,
    liveIndicator: false,
    link: "https://github.com/Ahmed-Khanji/Investment-Dashboard.git",
  },
  {
    title: "Workflow KPI Analytics",
    description: "Engineered a lightweight data pipeline to extract workflow data, cleaned and structured operational metrics using Pandas and SQL, and designed an interactive Power BI dashboard to visualize key trends.",
    tech: ["Python", "Pandas", "PostgreSQL", "ETL Pipelines", "SQL", "Power BI"],
    icon: <BarChart3 className="text-accent" size={24} />,
    accent: "accent" as const,
    liveIndicator: false,
    link: "https://github.com/Ahmed-Khanji/Workflow-KPI-Analytics.git",
  },
];

const Projects = () => (
  <section id="projects" className="section-padding relative">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-muted-foreground text-lg">Production systems with real-world impact.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="group"
          >
            <div className="glass rounded-2xl p-8 h-full hover:glow-primary transition-all duration-500 relative overflow-hidden">
              {/* Gradient accent top */}
              <div className={`absolute top-0 left-0 right-0 h-px ${project.accent === "accent" ? "bg-gradient-to-r from-transparent via-accent to-transparent" : "bg-gradient-to-r from-transparent via-primary to-transparent"}`} />

              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-xl bg-secondary">
                  {project.icon}
                </div>
                {project.liveIndicator && (
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
                    Live
                  </div>
                )}
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                  </a>
                ) : (
                  <ExternalLink size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                )}
              </div>

              <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-gradient transition-all">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
