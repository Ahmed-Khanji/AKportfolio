import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, Globe } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/3 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg">Open to opportunities and collaborations.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            {(["name", "email"] as const).map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                placeholder={field === "name" ? "Your Name" : "Your Email"}
                required
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            ))}
            <textarea
              placeholder="Your Message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
            <button
              type="submit"
              className="bg-gradient-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all flex items-center gap-2 glow-primary"
            >
              {sent ? "Message Sent! ✓" : (
                <>Send Message <Send size={16} /></>
              )}
            </button>
          </motion.form>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6 space-y-5">
              {[
                { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/Ahmed-Khanji" },
                { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://linkedin.com/in/ahmedkhanji" },
                { icon: <Mail size={20} />, label: "Email", href: "mailto:aksoftwaredev1@gmail.com" },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <span className="text-primary group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span className="text-sm font-medium">{link.label}</span>
                </a>
              ))}
            </div>

            {/* Languages */}
            <div className="glass rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                <Globe size={16} /> Languages
              </h4>
              <div className="flex gap-3">
                {["English", "French", "Arabic"].map((lang) => (
                  <span key={lang} className="text-sm px-3 py-1.5 rounded-lg bg-secondary text-muted-foreground">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
