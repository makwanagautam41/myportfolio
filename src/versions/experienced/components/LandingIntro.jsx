import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { welcomeWords } from "../data/data";
import "./LandingIntro.css";

const LandingIntro = ({ onComplete }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const wordTimer = window.setInterval(() => {
      setWordIndex((index) => {
        if (index >= welcomeWords.length - 1) {
          window.clearInterval(wordTimer);
          window.setTimeout(() => setIsLeaving(true), 380);
          return index;
        }
        return index + 1;
      });
    }, 520);
    return () => window.clearInterval(wordTimer);
  }, []);

  return (
    <motion.div
      className="exp-landing-intro"
      initial={{ y: 0 }}
      animate={{ y: isLeaving ? "-100%" : 0 }}
      transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => { if (isLeaving) onComplete(); }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={wordIndex}
          className="exp-landing-text"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{    opacity: 1 }}
          transition={{ duration: 0 }}
        >
          <span className="exp-landing-dot" />
          {welcomeWords[wordIndex]}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};

export default LandingIntro;