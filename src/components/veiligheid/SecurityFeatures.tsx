import React from "react";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, UserCheck, FileText } from "lucide-react";

const FEATURES = [
  {
    icon: Lock,
    title: "Versleutelde Gegevensoverdracht",
    description: "Alle datacommunicatie tussen jouw browser, de IQ Bot en onze infrastructuur verloopt via geavanceerde TLS 1.3 encryptie met strikte certificaatvalidatie.",
    colorClass: "text-indigo",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Trust Security Rules",
    description: "Cloud Firestore Security Rules controleren iedere databaseaanvraag op serverniveau. Gegevens zijn hermetisch gescheiden en ontoegankelijk voor onbevoegde partijen.",
    colorClass: "text-cyan",
  },
  {
    icon: UserCheck,
    title: "Rolgebaseerde Toegangscontrole (RBAC)",
    description: "Leden hebben uitsluitend toegang tot hun eigen dossier, cashflowstatistieken en taken. Beheerdersrechten zijn onderworpen aan meerlaagse authenticatie.",
    colorClass: "text-mint",
  },
  {
    icon: FileText,
    title: "Onweerlegbare Auditlogging",
    description: "Elke cashflowmutatie, statuswijziging en protocoltransactie wordt onveranderlijk vastgelegd met een cryptografische tijdstempel en gebruikersidentificatie.",
    colorClass: "text-amber",
  },
];

export default function SecurityFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {FEATURES.map((feat, i) => (
        <motion.div
          key={feat.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="card-paper p-8 shadow-level-1 hover:shadow-level-2 transition-all duration-300"
        >
          <div className="icon-tile icon-tile--paper mb-6">
            <feat.icon className={`h-5 w-5 ${feat.colorClass}`} />
          </div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-graphite mb-2.5">
            {feat.title}
          </h3>
          <p className="text-base leading-7 text-graphite-muted">
            {feat.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}