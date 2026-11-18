import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function IntroSequence({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onFinish, 2550);
    return () => window.clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="intro-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
      aria-label="Site initialization"
    >
      <div className="intro-grid" />
      <div className="intro-content">
        <div className="intro-mark">JF<span> / </span>01</div>
        <div className="intro-console">
          <p><span>SYS</span> establishing field connection <b>OK</b></p>
          <p><span>GEO</span> 48.9445° N / 20.5615° E <b>LOCKED</b></p>
          <p><span>DEV</span> loading technical portfolio <b>READY</b></p>
        </div>
        <div className="intro-progress"><span /></div>
        <div className="intro-bottom"><span>SPIŠSKÁ NOVÁ VES · SLOVAKIA</span><button type="button" onClick={onFinish}>Skip intro <ArrowRight size={14} /></button></div>
      </div>
    </motion.div>
  );
}

