import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const lines = [
{ text: "> npm run build-career", delay: 0 },
{ text: "✔ System Design", delay: 0.6 },
{ text: "✔ Full Stack", delay: 1.0 },
{ text: "✔ Real-time Systems", delay: 1.4 },
{ text: "✔ AI Integration", delay: 1.8 },
{ text: "✔ CI/CD", delay: 2.2 },
{ text: "✔ Cloud Deployment", delay: 2.6 },
{ text: "✔ Intelligent Agents", delay: 3.0 },
{ text: "", delay: 3.4 },
{ text: "🚀 Build successful. Ready for production.", delay: 3.6 }];


const TerminalAnimation = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timers = lines.map((line, i) =>
    setTimeout(() => setVisibleLines(i + 1), line.delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [started]);

  return (
    <section className="section-padding">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setStarted(true)}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl overflow-hidden">

          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-accent/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="text-xs text-muted-foreground ml-2 font-mono">terminal</span>
          </div>

          <div className="p-6 font-mono text-sm space-y-1 min-h-[280px]">
            {lines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  line.text.startsWith(">")
                    ? "text-foreground font-bold"
                    : line.text.startsWith("🚀")
                    ? "text-blue-400 mt-2 font-semibold"
                    : "text-muted-foreground"
                }
              >
                {line.text}
              </motion.div>
            ))}
            {visibleLines < lines.length &&
              <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
            }
          </div>
        </motion.div>
      </div>
    </section>);

};

export default TerminalAnimation;