import { motion } from "framer-motion";
import { CheckCircle2, Layers, Code2, Server, Container, GitBranch, Shield, Gauge } from "lucide-react";

const principles = [
  { icon: <Layers size={18} />, label: "Clean Architecture (MVC, Layered)" },
  { icon: <Code2 size={18} />, label: "API-First Thinking" },
  { icon: <Server size={18} />, label: "Scalable Microservices" },
  { icon: <Container size={18} />, label: "Dockerized Environments" },
  { icon: <GitBranch size={18} />, label: "Production-Grade CI/CD" },
  { icon: <CheckCircle2 size={18} />, label: "Agile Development" },
  { icon: <Gauge size={18} />, label: "Performance Optimization" },
  { icon: <Shield size={18} />, label: "Security-First Mindset" },
];

const Philosophy = () => (
  <section className="section-padding relative">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Engineering <span className="text-gradient">Approach</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {principles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex items-center gap-3 p-4 rounded-xl hover:bg-secondary/50 transition-colors group"
          >
            <span className="text-primary group-hover:scale-110 transition-transform">{p.icon}</span>
            <span className="text-sm font-medium text-foreground">{p.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Philosophy;
