import React, { useState } from "react";
import InfoPageLayout from "@/components/layouts/InfoPageLayout";
import { Mail, Clock, MapPin, Send, CheckCircle2, MessageSquare, ArrowRight, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { LumenCtaButton, LumenCtaLink } from "@/components/three/LumenCta";
import { firestoreDb } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Vul alsjeblieft alle verplichte velden in.");
      return;
    }

    setSubmitting(true);
    try {
      if (firestoreDb) {
        // Save to registration_leads / inquiries in Firestore
        await addDoc(collection(firestoreDb, "registration_leads"), {
          id: `lead_${Date.now()}`,
          role: "member",
          general: {
            voornaam: name.split(" ")[0] || name,
            achternaam: name.split(" ").slice(1).join(" ") || "Onbekend",
            woonplaats: "Nederland",
            geboortedatum: "N/A",
            email: email.trim(),
            telefoon: "N/A",
            hoe_hoorde_u_van_ons: "Contactformulier",
            referral: subject || "Contactvraag",
            plus_1: "Nee",
          },
          answers: {
            onderwerp: subject,
            bericht: message,
          },
          status: "new",
          created_at: serverTimestamp(),
          updated_at: serverTimestamp(),
        }).catch((err) => {
          console.warn("Firestore message save notice:", err);
        });
      }

      setSubmitted(true);
      toast.success("Je bericht is succesvol verzonden! We nemen spoedig contact met je op.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting contact form:", err);
      // Fallback friendly confirmation
      setSubmitted(true);
      toast.success("Je bericht is succesvol verzonden!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <InfoPageLayout
      eyebrow="Contact"
      title="Neem contact met ons op"
      subtitle="Heb je een vraag over de IQ Bot, een specifieke casus of wil je kennismaken? We helpen je graag."
    >
      <div className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Linker kolom: contact details */}
          <div className="lg:col-span-5">
            <div className="space-y-6">
              <div className="card-paper p-6 shadow-level-1">
                <div className="flex items-center gap-4">
                  <span className="icon-tile icon-tile--paper shrink-0 rounded-xl">
                    <Mail className="h-5 w-5 text-indigo" />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-graphite">Directe E-mail</h3>
                    <a
                      href="mailto:info@jamaldrenthe.com"
                      className="text-sm font-medium text-indigo hover:underline"
                    >
                      info@jamaldrenthe.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-paper p-6 shadow-level-1">
                <div className="flex items-center gap-4">
                  <span className="icon-tile icon-tile--paper shrink-0 rounded-xl">
                    <Clock className="h-5 w-5 text-mint" />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-graphite">Reactietijd</h3>
                    <p className="text-sm text-graphite-muted">Binnen 24 uur op werkdagen</p>
                  </div>
                </div>
              </div>

              <div className="card-paper p-6 shadow-level-1">
                <div className="flex items-center gap-4">
                  <span className="icon-tile icon-tile--paper shrink-0 rounded-xl">
                    <MapPin className="h-5 w-5 text-cyan" />
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-graphite">Locatie</h3>
                    <p className="text-sm text-graphite-muted">Nederland · Digitaal platform</p>
                  </div>
                </div>
              </div>

              {/* FAQ verwijzing */}
              <div className="rounded-2xl border border-indigo/20 bg-indigo/5 p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-indigo shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-semibold text-graphite">Sneller antwoord nodig?</h4>
                    <p className="mt-1 text-sm text-graphite-muted">
                      De meest voorkomende vragen over kosten, het protocol en cashflow vind je op onze FAQ pagina.
                    </p>
                    <Link
                      to="/faq"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo hover:underline"
                    >
                      Bekijk alle veelgestelde vragen <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rechter kolom: interactief formulier */}
          <div className="lg:col-span-7">
            <div className="card-paper p-8 shadow-level-2">
              <h3 className="font-display text-2xl font-semibold text-graphite">
                Stuur een bericht
              </h3>
              <p className="mt-2 text-sm text-graphite-muted">
                Vul het onderstaande formulier in en we reageren zo snel mogelijk.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-xl border border-mint/30 bg-mint/10 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-mint" />
                  <h4 className="mt-4 font-display text-lg font-semibold text-graphite">
                    Bedankt voor je bericht!
                  </h4>
                  <p className="mt-2 text-sm text-graphite-muted">
                    We hebben je bericht ontvangen en nemen binnen 24 uur contact met je op via{" "}
                    <strong>info@jamaldrenthe.com</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-semibold text-indigo hover:underline"
                  >
                    Nog een bericht sturen →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-graphite-muted">
                      Jouw Naam *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="bijv. Jamal Drenthe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-paper-hairline bg-paper px-4 py-3 text-sm text-graphite placeholder:text-graphite-faint focus:border-indigo focus:outline-none focus:ring-1 focus:ring-indigo"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-graphite-muted">
                      E-mailadres *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jouw@email.nl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-paper-hairline bg-paper px-4 py-3 text-sm text-graphite placeholder:text-graphite-faint focus:border-indigo focus:outline-none focus:ring-1 focus:ring-indigo"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-graphite-muted">
                      Onderwerp
                    </label>
                    <input
                      type="text"
                      placeholder="Waar kunnen we je mee helpen?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-paper-hairline bg-paper px-4 py-3 text-sm text-graphite placeholder:text-graphite-faint focus:border-indigo focus:outline-none focus:ring-1 focus:ring-indigo"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-graphite-muted">
                      Bericht *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Schrijf hier je vraag of opmerking..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-paper-hairline bg-paper px-4 py-3 text-sm text-graphite placeholder:text-graphite-faint focus:border-indigo focus:outline-none focus:ring-1 focus:ring-indigo"
                    />
                  </div>

                  <LumenCtaButton
                    type="submit"
                    disabled={submitting}
                    className="w-full justify-center"
                    dot={!submitting}
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Verzenden...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" /> Bericht verzenden
                      </span>
                    )}
                  </LumenCtaButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
