
import { motion } from "framer-motion";

export const ConfirmationOrbs = () => {
  return (
    <>
      {/* Grote orb rechtsboven */}
      <motion.div
        className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-indigo-500 rounded-full opacity-20 blur-3xl z-0"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.18 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      {/* Kleine orb linksonder */}
      <motion.div
        className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400 rounded-full opacity-20 blur-2xl z-0"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.13 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      />
    </>
  );
};
