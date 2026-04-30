import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = `${import.meta.env.BASE_URL}stemconnect-demo.mp4`;

const formatTime = (seconds: number) => {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const Demo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startPlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setHasStarted(true);
      setIsPlaying(true);
    } catch {
      video.muted = true;
      setIsMuted(true);
      await video.play();
      setHasStarted(true);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = Math.min(Math.max(ratio, 0), 1) * duration;
  };

  const enterFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    if (isPlaying) {
      hideTimeout.current = setTimeout(() => setShowControls(false), 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

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
            ref={containerRef}
            className="relative aspect-video bg-black overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
          >
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              className="absolute inset-0 w-full h-full object-contain bg-black"
              playsInline
              preload="metadata"
              onClick={hasStarted ? togglePlay : undefined}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onTimeUpdate={(e) => {
                const v = e.currentTarget;
                setCurrentTime(v.currentTime);
                setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
              }}
            />

            <AnimatePresence>
              {!hasStarted && (
                <motion.button
                  key="start-overlay"
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={startPlayback}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm z-20 cursor-pointer"
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
                    <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                  </motion.div>
                  <p className="text-sm text-muted-foreground">Click to play demo</p>
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {hasStarted && showControls && (
                <motion.div
                  key="controls"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-3 pt-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="group/bar relative h-1.5 w-full rounded-full bg-white/20 cursor-pointer mb-3"
                    onClick={handleSeek}
                  >
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary"
                      style={{ width: `${progress}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover/bar:opacity-100 transition-opacity"
                      style={{ left: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-3 text-white">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="hover:text-primary transition-colors"
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                    </button>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="hover:text-primary transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <span className="text-xs tabular-nums text-white/80">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    <button
                      type="button"
                      onClick={enterFullscreen}
                      className="ml-auto hover:text-primary transition-colors"
                      aria-label="Fullscreen"
                    >
                      <Maximize2 size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4 sm:p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">STEMConnect Platform Walkthrough</p>
              <p className="text-xs text-muted-foreground mt-1">Auth · Home · Course Chat · Quizzes · Projects</p>
            </div>
            <a href="https://stemconnect-five.vercel.app/" className="text-xs text-primary hover:underline flex items-center gap-1">
              View Website <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;
