import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, MousePointer2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import demoAuth from "@/assets/demo-auth.png";
import demoHome from "@/assets/demo-home.png";
import demoChat from "@/assets/demo-chat.png";
import demoQuizLight from "@/assets/demo-quiz-light.png";
import demoQuizDark from "@/assets/demo-quiz-dark.png";

type SceneId = "auth" | "home" | "chat" | "quiz" | "ending";

interface CursorStep {
  x: string;
  y: string;
  duration: number;
  click?: boolean;
}

interface SceneConfig {
  next: SceneId;
  duration: number;
  image?: string;
  label?: string;
  description?: string;
  zoom?: { scale: number; originX: string; originY: string };
  cursorSteps: CursorStep[];
}

const timeline: Record<SceneId, SceneConfig> = {
  auth: {
    next: "home",
    duration: 4000,
    image: demoAuth,
    label: "Authentication",
    description: "Secure registration with Google SSO and form validation",
    zoom: { scale: 1.05, originX: "50%", originY: "40%" },
    cursorSteps: [
      // Start top-left
      { x: "5%", y: "5%", duration: 0.5 },
      // Move smoothly to center target
      { x: "50%", y: "50%", duration: 1.5 },
      // Small delay before clicking (stays in place)
      { x: "50%", y: "50%", duration: 0.6 },
      // Click
      { x: "50%", y: "30%", duration: 0.2, click: true },
    ],
  },
  home: {
    next: "chat",
    duration: 7000,
    image: demoHome,
    label: "Landing Page",
    description: "Hero section with key features and call-to-action",
    zoom: { scale: 1.08, originX: "50%", originY: "20%" },
    cursorSteps: [
      { x: "50%", y: "15%", duration: 1.0 },
      { x: "50%", y: "35%", duration: 1.5, click: true },
      { x: "30%", y: "55%", duration: 1.0 },
      { x: "50%", y: "55%", duration: 0.8 },
      { x: "70%", y: "55%", duration: 0.8 },
      { x: "50%", y: "80%", duration: 1.0 },
    ],
  },
  chat: {
    next: "quiz",
    duration: 8000,
    image: demoChat,
    label: "Course Chat",
    description: "Real-time collaborative messaging with course channels",
    zoom: { scale: 1.06, originX: "30%", originY: "40%" },
    cursorSteps: [
      { x: "12%", y: "25%", duration: 1.0, click: true },
      { x: "12%", y: "35%", duration: 1.2, click: true },
      { x: "50%", y: "30%", duration: 1.0 },
      { x: "50%", y: "50%", duration: 1.0 },
      { x: "85%", y: "25%", duration: 1.2, click: true },
      { x: "50%", y: "95%", duration: 1.0 },
    ],
  },
  quiz: {
    next: "ending",
    duration: 8000,
    image: demoQuizLight,
    label: "Pop Quiz",
    description: "Interactive quizzes with progress tracking",
    zoom: { scale: 1.05, originX: "50%", originY: "30%" },
    cursorSteps: [
      { x: "50%", y: "25%", duration: 1.2 },
      { x: "30%", y: "45%", duration: 1.0 },
      { x: "70%", y: "45%", duration: 0.8 },
      { x: "90%", y: "5%", duration: 1.0, click: true }, // toggle dark mode
    ],
  },
  ending: {
    next: "auth",
    duration: 6000,
    cursorSteps: [],
  },
};

const sceneOrder: SceneId[] = ["auth", "home", "chat", "quiz", "ending"];

function SceneWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 flex flex-col items-center justify-center text-white p-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}

const Demo = () => {
  const [scene, setScene] = useState<SceneId>("auth");
  const [cursorPos, setCursorPos] = useState({ x: "5%", y: "5%" });
  const [isClicking, setIsClicking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dark, setDark] = useState(false);
  const [cursorStepIndex, setCursorStepIndex] = useState(0);

  const startDemo = useCallback(() => {
    setIsPlaying(true);
    setScene("auth");
    setDark(false);
    setCursorStepIndex(0);
    setCursorPos({ x: "50%", y: "50%" });
  }, []);

  // Timeline: advance scenes
  useEffect(() => {
    if (!isPlaying) return;
    const config = timeline[scene];

    const timer = setTimeout(() => {
      const next = config.next;
      if (next === "auth") {
        // Loop ended, stop playing
        setIsPlaying(false);
        setScene("auth");
        setDark(false);
      } else {
        setScene(next);
        setCursorStepIndex(0);
        setCursorPos({ x: "50%", y: "50%" });
      }
    }, config.duration);

    return () => clearTimeout(timer);
  }, [scene, isPlaying]);

  // Animate cursor through steps
  useEffect(() => {
    if (!isPlaying || scene === "ending") return;
    const config = timeline[scene];
    if (cursorStepIndex >= config.cursorSteps.length) return;

    const step = config.cursorSteps[cursorStepIndex];
    const timeout = setTimeout(() => {
      setCursorPos({ x: step.x, y: step.y });
      if (step.click) {
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 200);
        // Dark mode toggle on quiz scene last click
        if (scene === "quiz" && cursorStepIndex === config.cursorSteps.length - 1) {
          setTimeout(() => setDark(true), 300);
        }
      }
      setCursorStepIndex((prev) => prev + 1);
    }, step.duration * 1000);

    return () => clearTimeout(timeout);
  }, [isPlaying, scene, cursorStepIndex]);

  const config = timeline[scene];
  const currentImage = scene === "quiz" && dark ? demoQuizDark : config.image;
  const sceneIndex = sceneOrder.indexOf(scene);

  return (
    <section id="ai" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            STEMConnect <span className="text-gradient">Demo</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A real-time collaborative study platform — watch it in action.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden glass group"
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/40 via-transparent to-accent/40 -z-10" />

          <div
            className="relative aspect-video bg-black/90 overflow-hidden cursor-pointer"
            onClick={!isPlaying ? startDemo : undefined}
          >
            {/* Start overlay */}
            <AnimatePresence mode="wait">
              {!isPlaying && (
                <motion.div
                  key="start-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm z-20"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30 mb-4"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(var(--primary), 0.3)",
                        "0 0 40px rgba(var(--primary), 0.5)",
                        "0 0 20px rgba(var(--primary), 0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                  <p className="text-sm text-muted-foreground">Click to start demo</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scene images */}
            <AnimatePresence mode="wait">
              {isPlaying && scene !== "ending" && currentImage && (
                <motion.div
                  key={`${scene}-${dark ? "dark" : "light"}`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{
                    opacity: 1,
                    scale: config.zoom?.scale || 1,
                  }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{
                    opacity: { duration: 0.6 },
                    scale: { duration: config.duration / 1000, ease: "easeOut" },
                    x: { duration: 0.4 },
                  }}
                  className={`absolute inset-0 transition-colors duration-700 ${
                    scene === "quiz" && dark ? "brightness-90" : ""
                  }`}
                  style={{
                    transformOrigin: config.zoom ? `${config.zoom.originX} ${config.zoom.originY}` : "center center",
                  }}
                >
                  <img
                    src={currentImage}
                    alt={config.label || scene}
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Animated cursor */}
            {isPlaying && scene !== "ending" && (
              <motion.div
                className="absolute z-30 pointer-events-none"
                animate={{ left: cursorPos.x, top: cursorPos.y }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transform: "translate(-4px, -4px)" }}
              >
                <motion.div animate={{ scale: isClicking ? 0.7 : 1 }} transition={{ duration: 0.15 }}>
                  <MousePointer2 size={24} className="text-black drop-shadow-lg" fill="rgba(0,0,0,0.9)" />
                </motion.div>
                <AnimatePresence>
                  {isClicking && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0.8 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white/60"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Scene label */}
            {isPlaying && scene !== "ending" && config.label && (
              <motion.div
                key={`label-${scene}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute top-4 left-4 z-30 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10"
              >
                <span className="text-xs font-medium text-white/90">{config.label}</span>
              </motion.div>
            )}

            {/* Progress dots */}
            {isPlaying && scene !== "ending" && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {sceneOrder
                  .filter((s) => s !== "ending")
                  .map((s, i) => (
                    <motion.div
                      key={s}
                      className={`h-1.5 rounded-full transition-colors duration-300 ${
                        i === sceneIndex ? "bg-white w-6" : i < sceneIndex ? "bg-white/60 w-1.5" : "bg-white/30 w-1.5"
                      }`}
                      layout
                    />
                  ))}
              </div>
            )}

            {/* Ending screen */}
            <AnimatePresence>
              {scene === "ending" && isPlaying && (
                <motion.div
                  key="ending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center"
                  >
                    <motion.div
                      className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                      animate={{
                        textShadow: [
                          "0 0 20px rgba(168,85,247,0.4)",
                          "0 0 40px rgba(168,85,247,0.6)",
                          "0 0 20px rgba(168,85,247,0.4)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      STEMConnect
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className="text-white/70 text-lg tracking-wide"
                    >
                      Learn Together. Build Together.
                    </motion.p>
                  </motion.div>
                  <motion.div
                    className="absolute w-64 h-64 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
                    style={{
                      background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Caption bar */}
          <div className="p-4 sm:p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">STEMConnect Platform Walkthrough</p>
              <p className="text-xs text-muted-foreground mt-1">Auth · Home · Course Chat · Quizzes · Projects</p>
            </div>
            <a href="#projects" className="text-xs text-primary hover:underline flex items-center gap-1">
              View Project <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;
