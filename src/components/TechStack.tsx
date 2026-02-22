import { motion } from "framer-motion";

const categories = [
  {
    title: "Programming",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "SQL", "Bash"],
  },
  {
    title: "Frontend",
    items: ["React", "Redux", "Tailwind CSS", "WebSocket"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "Django", "FastAPI", "ASP.NET"],
  },
  {
    title: "Databases & Data Analytics",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Power BI", "Excel"],
  },
  {
    title: "DevOps & Cloud",
    items: ["Docker", "Kubernetes", "AWS EC2", "S3", "CI/CD", "GitHub Actions", "Linux"],
  },
  {
    title: "AI & ML",
    items: ["OpenAI API", "Scikit-learn", "RAG", "LangChain", "Vector DBs", "Pandas", "NumPy"],
  },
];

const TechStack = () => (
  <section id="stack" className="section-padding relative">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Tech <span className="text-gradient">Stack</span>
        </h2>
        <p className="text-muted-foreground text-lg">Tools I use to build production systems.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">{cat.title}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="text-sm font-mono px-3 py-1.5 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all duration-200 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TechStack;
