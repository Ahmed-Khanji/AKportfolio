import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certs = [
  "IBM Full Stack Development",
  "IBM Cloud Computing",
  "IBM Software Engineering",
  "Google Python IT Automation",
];

const Certifications = () => (
  <section className="section-padding relative">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="text-gradient">Certifications</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="glass rounded-xl p-5 flex items-center gap-3 hover:glow-primary transition-all duration-500 group"
          >
            <Award size={18} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-foreground">{cert}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
