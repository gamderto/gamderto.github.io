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
      aria-label="Spúšťanie stránky"
    >
      <div className="intro-grid" />
      <div className="intro-content">
        <div className="intro-mark">MP<span> / </span>01</div>
        <div className="intro-console">
          <p><span>SYS</span> nadväzujem spojenie s terénom <b>OK</b></p>
          <p><span>GEO</span> 48.9445° N / 20.5615° E <b>URČENÉ</b></p>
          <p><span>DEV</span> načítavam technické portfólio <b>PRIPRAVENÉ</b></p>
        </div>
        <div className="intro-progress"><span /></div>
        <div className="intro-bottom"><span>SPIŠSKÁ NOVÁ VES · SLOVENSKO</span><button type="button" onClick={onFinish}>Preskočiť intro <ArrowRight size={14} /></button></div>
      </div>
    </motion.div>
  );
}

