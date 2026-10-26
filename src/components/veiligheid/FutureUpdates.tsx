import React from "react";
import { motion } from "framer-motion";

export default function FutureUpdates() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-base leading-8 text-graphite-muted max-w-2xl mx-auto text-center"
    >
      Onze beveiligingsinfrastructuur wordt continu geaudit en aangescherpt. Op de roadmap staan verdere uitbreidingen van geavanceerde hardware-sleutelauthenticatie (WebAuthn/FIDO2) en cryptografische auditverificaties.
    </motion.p>
  );
}