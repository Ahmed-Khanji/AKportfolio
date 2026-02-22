import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Full Stack Developer Intern",
    company: "Intelligence Industrielle",
    location: "Montreal",
    period: "Jan 2026 – Present",
    highlights: [
      "Built MERN dashboards for manufacturing KPI monitoring",
      "Designed KPI-driven intelligent agents for real-time optimization",
      "Implemented Docker Compose + CI/CD pipelines",
      "Worked in Agile (Jira) + Git workflows",
    ],
    tags: ["MERN Stack Architecture", "Real-time Systems", "Intelligent Agents", "DevOps"],
  },
  {
    title: "Freelance Software Developer",
    company: "Académie de l'Avenir Souriant",
    period: "May 2025 – Aug 2025",
    highlights: [
      "Built full production React + FastAPI platform",
      "Multi-role authentication system with role-based access control",
      "Booking + discovery engine with PostgreSQL backend",
      "40% API performance improvement through database optimization",
    ],
    tags: ["Web Development", "Backend Optimization", "REST Architecture", "RBAC"],
  },
  {
    title: "IT Specialist",
    company: "GLS Logistics",
    period: "Aug 2024 – Dec 2025",
    highlights: [
      "Managed Active Directory & internal infrastructure",
      "Maintained APIs & EDI workflows",
      "Resolved 96% of support tickets within SLA",
      "Optimized internal IT systems",
    ],
    tags: ["Infrastructure", "Technical Support", "API Maintenance"],
  },
];

const Experience = () => (
  <section id="experience" className="section-padding relative">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Work <span className="text-gradient">Experience</span>
        </h2>
        <p className="text-muted-foreground text-lg">Production systems, real impact.</p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden sm:block" />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative sm:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-gradient-primary border-4 border-background hidden sm:block" />

              <div className="glass rounded-2xl p-6 sm:p-8 hover:glow-primary transition-all duration-500 group">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-gradient transition-all">
                      {exp.title}
                    </h3>
                    <p className="text-primary font-medium flex items-center gap-2">
                      <Briefcase size={14} /> {exp.company}
                      {exp.location && <span className="text-muted-foreground">· {exp.location}</span>}
                    </p>
                  </div>
                  <span className="text-muted-foreground text-sm flex items-center gap-1.5 shrink-0">
                    <Calendar size={14} /> {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-primary mt-1.5 shrink-0">▸</span> {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
