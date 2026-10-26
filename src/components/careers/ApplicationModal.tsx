import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  CheckCircle2,
  Briefcase,
  User,
  Mail,
  Phone,
  Linkedin,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VACANCIES, Vacancy } from "@/data/careersData";
import { firestoreDb } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialVacancyId?: string;
}

export const ApplicationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialVacancyId = "01",
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialVacancyId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [contractType, setContractType] = useState("In overleg / Beide bespreekbaar");
  const [hours, setHours] = useState("32–40 per week");
  const [cvLink, setCvLink] = useState("");
  const [motivation, setMotivation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialVacancyId) {
      setSelectedId(initialVacancyId);
    }
  }, [initialVacancyId]);

  const activeVacancy = VACANCIES.find((v) => v.id === selectedId) || VACANCIES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Vul alsjeblieft minimaal je naam en e-mailadres in.");
      return;
    }

    setSubmitting(true);
    try {
      if (firestoreDb) {
        await addDoc(collection(firestoreDb, "registration_leads"), {
          id: `career_${Date.now()}`,
          role: "career_applicant",
          general: {
            voornaam: name.split(" ")[0] || name,
            achternaam: name.split(" ").slice(1).join(" ") || "",
            email: email.trim(),
            telefoon: phone.trim() || "N/A",
            linkedin: linkedin.trim() || "N/A",
            woonplaats: "Remote",
          },
          career: {
            vacancyId: activeVacancy.id,
            vacancyTitle: activeVacancy.title,
            domain: activeVacancy.domain,
            contractType,
            hours,
            cvLink: cvLink.trim() || "N/A",
            motivation: motivation.trim() || "Geen toelichting ingevoerd",
          },
          status: "new",
          source: "Careers Page Application Form",
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        }).catch((err) => {
          console.warn("Firestore save notice:", err);
        });
      }

      setSubmitted(true);
      toast.success(
        `Sollicitatie voor [${activeVacancy.id}] ${activeVacancy.title} succesvol ontvangen!`
      );
    } catch (err) {
      console.error("Sollicitatie indienen mislukt:", err);
      toast.error("Er trad een fout op bij het indienen. Probeer het opnieuw of stuur een e-mail naar info@investbotiq.com.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setLinkedin("");
    setCvLink("");
    setMotivation("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        hideCloseButton={true}
        className="w-[94vw] sm:w-[90vw] sm:max-w-xl md:max-w-2xl p-0 overflow-hidden bg-[#070a14] border border-white/20 text-white shadow-2xl rounded-3xl z-[100]"
      >
        <DialogHeader className="p-4 sm:p-5 border-b border-white/10 flex flex-row items-center justify-between space-y-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-cyan-400 font-bold">
                [{activeVacancy.id}/13]
              </span>
              <span className="font-mono text-xs text-zinc-400">
                100% Remote · ZZP of Vast
              </span>
            </div>
            <DialogTitle className="text-lg sm:text-xl font-bold font-display text-white">
              Direct Solliciteren
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-400 mt-0.5">
              Solliciteer op een van de 13 sleutelposities binnen onze holding & AI-ecosysteem.
            </DialogDescription>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 p-2 text-zinc-400 hover:text-white hover:bg-white/10 transition"
            title="Sluiten"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        {submitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mint/20 border border-mint/40 text-mint mx-auto shadow-glow">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">
              Sollicitatie Ontvangen!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
              Bedankt voor je interesse in de functie van{" "}
              <strong className="text-cyan-300">
                [{activeVacancy.id}] {activeVacancy.title}
              </strong>
              . Ons recruitment- en partnerteam beoordeelt je dossier en neemt binnen 24–48 uur contact met je op voor het 30-minuten kennismakingsgesprek.
            </p>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left text-xs font-mono text-zinc-400 space-y-1.5 max-w-md mx-auto">
              <div className="text-zinc-300 font-semibold mb-1">Volgende stappen:</div>
              <div>1. Review van je profiel en trackrecord</div>
              <div>2. Uitnodiging voor videocall (30 min)</div>
              <div>3. Bespreken van vergoedingsstructuur & onboarding</div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 px-6 py-2.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/30 transition"
              >
                Sluiten
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Vacancy selector */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                Kies Vacature (01 t/m 13) *
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-sans"
              >
                {VACANCIES.map((v) => (
                  <option key={v.id} value={v.id} className="bg-[#070a14] text-white">
                    [{v.id}] {v.title} — {v.reward}
                  </option>
                ))}
              </select>
            </div>

            {/* Contract type & hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  Dienstverband Voorkeur
                </label>
                <select
                  value={contractType}
                  onChange={(e) => setContractType(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
                >
                  <option value="In overleg / Beide bespreekbaar" className="bg-[#070a14]">
                    In overleg / Beide bespreekbaar
                  </option>
                  <option value="ZZP / Freelance" className="bg-[#070a14]">
                    ZZP / Freelance
                  </option>
                  <option value="Vast Contract" className="bg-[#070a14]">
                    Vast Contract
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  Beschikbaarheid
                </label>
                <select
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-sans"
                >
                  <option value="24 uur per week" className="bg-[#070a14]">24 uur per week</option>
                  <option value="32 uur per week" className="bg-[#070a14]">32 uur per week</option>
                  <option value="32–40 per week" className="bg-[#070a14]">32–40 per week (Fulltime)</option>
                  <option value="Flexibel / Projectbasis" className="bg-[#070a14]">Flexibel / Projectbasis</option>
                </select>
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <User className="h-3 w-3 text-cyan-400" />
                  Voor- en achternaam *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Bijv. Alexander de Vries"
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-cyan-400" />
                  E-mailadres *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="naam@organisatie.com"
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="h-3 w-3 text-cyan-400" />
                  Telefoonnummer
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+31 6 12345678"
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Linkedin className="h-3 w-3 text-cyan-400" />
                  LinkedIn Profiel URL
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/jouwprofiel"
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* CV link / portfolio */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <FileText className="h-3 w-3 text-cyan-400" />
                Link naar CV / Portfolio (Google Drive, Dropbox, Notion, website)
              </label>
              <input
                type="text"
                value={cvLink}
                onChange={(e) => setCvLink(e.target.value)}
                placeholder="https://drive.google.com/... of stuur per e-mail"
                className="w-full rounded-xl bg-white/5 border border-white/15 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Motivation / Trackrecord */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                Korte Toelichting op je Trackrecord & Beschikbaarheid
              </label>
              <textarea
                rows={3}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Licht beknopt je relevante ervaring, successen en gewenste startdatum toe..."
                className="w-full rounded-xl bg-white/5 border border-white/15 p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Direct Email fallback note */}
            <p className="text-[11px] font-mono text-zinc-500">
              Liever rechtstreeks je PDF sturen? Mail je CV en gewenste ID naar{" "}
              <a
                href={`mailto:info@investbotiq.com?subject=Sollicitatie%20[${activeVacancy.id}]%20${encodeURIComponent(
                  activeVacancy.title
                )}`}
                className="text-cyan-400 hover:underline"
              >
                info@investbotiq.com
              </a>
              .
            </p>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs text-zinc-400 hover:text-white transition"
              >
                Annuleren
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500/25 border border-cyan-500/40 px-5 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/35 transition disabled:opacity-50 shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{submitting ? "Verzenden..." : "Verstuur Sollicitatie"}</span>
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationModal;
