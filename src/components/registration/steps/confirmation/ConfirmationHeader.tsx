
import { motion } from "framer-motion";

export const ConfirmationHeader = () => {
  return (
    <div className="flex flex-col items-center mb-6">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-full p-3 shadow-lg mb-2"
      >
        {/* Check icoon */}
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#eef2ff" />
          <path d="M7 13l3 3 7-7" stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-ink mt-2 tracking-tight">
        Bevestig uw aanmelding
      </h2>
      <p className="text-center text-muted-foreground max-w-lg mt-2">
        Controleer uw gegevens zorgvuldig voordat u uw aanmelding definitief verstuurt.
      </p>
    </div>
  );
};
