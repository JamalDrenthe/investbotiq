import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThreeScene } from "@/components/three/ThreeScene";

/**
 * Floating, clickable IQ Bot bubble — always on-screen on member pages,
 * navigates to the Intelligence tab on click.
 */
export const IqBotBubble = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      aria-label="Open Intelligence"
      title="IQ Bot — open Intelligence"
      onClick={() => navigate("/member/ai-running")}
      className="fixed bottom-6 right-6 z-50 group"
      initial={{ opacity: 0, scale: 0.6, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full border border-indigo-400/30 bg-canvas-elevated/80 shadow-glow backdrop-blur-md transition-colors group-hover:border-indigo-300/60 group-hover:bg-canvas-elevated sm:h-24 sm:w-24"
      >
        <div className="pointer-events-none absolute inset-0">
          <ThreeScene kind="iq-bot" scale={0.52} />
        </div>
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-mint text-[9px] font-black text-canvas shadow-level-2">
          AI
        </span>
      </motion.div>
    </motion.button>
  );
};

export default IqBotBubble;
