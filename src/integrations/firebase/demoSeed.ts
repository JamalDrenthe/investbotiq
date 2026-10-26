import { getDemoUserId } from "@/lib/demoBackend";

export function getInitialDemoRows(collectionName: string): Record<string, unknown>[] {
  const currentUserId = getDemoUserId() || "demo-member-id";
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;
  const prevDate2 = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  const prevMonth2 = `${prevDate2.getFullYear()}-${String(prevDate2.getMonth() + 1).padStart(2, "0")}`;

  switch (collectionName) {
    case "profiles":
      return [
        {
          id: currentUserId,
          email: "info@investbotiq.com",
          voornaam: "Jamal",
          achternaam: "Drenthe",
          telefoonnummer: "+31 6 12345678",
          created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "member-sarah",
          email: "sarah.devries@example.com",
          voornaam: "Sarah",
          achternaam: "de Vries",
          telefoonnummer: "+31 6 98765432",
          created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "member-marc",
          email: "marc.jansen@example.com",
          voornaam: "Marc",
          achternaam: "Jansen",
          telefoonnummer: "+31 6 45678901",
          created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

    case "registration_leads":
      return [
        {
          id: "lead-1",
          role: "ondernemer",
          status: "new",
          general: {
            voornaam: "David",
            achternaam: "van Dijk",
            email: "david.vandijk@techflow.nl",
            telefoon: "+31 6 22334455",
            woonplaats: "Amsterdam",
            hoe_hoorde_u_van_ons: "LinkedIn",
            referral: "info@investbotiq.com",
          },
          answers: {
            investering_bereik: "€10.000 - €25.000",
            doel: "Passieve maandelijkse cashflow opbouwen",
          },
          created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
          updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
        },
        {
          id: "lead-2",
          role: "member",
          status: "contacted",
          general: {
            voornaam: "Emma",
            achternaam: "Bakker",
            email: "emma.bakker@gmail.com",
            telefoon: "+31 6 33445566",
            woonplaats: "Rotterdam",
            hoe_hoorde_u_van_ons: "Vrienden/Bekenden",
          },
          answers: {
            investering_bereik: "€2.500 - €5.000",
            doel: "Sparen met geautomatiseerd rendement",
          },
          created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
          updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
        },
        {
          id: "lead-3",
          role: "freelancer",
          status: "converted",
          general: {
            voornaam: "Lars",
            achternaam: "Kuipers",
            email: "lars.kuipers@designstudio.nl",
            telefoon: "+31 6 55667788",
            woonplaats: "Utrecht",
            hoe_hoorde_u_van_ons: "Online Advertentie",
          },
          answers: {
            investering_bereik: "€5.000 - €10.000",
            doel: "Buffer opbouwen voor pensioen",
          },
          created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
          updated_at: new Date(Date.now() - 3 * 86400000).toISOString(),
        },
      ];

    case "cashflows":
      return [
        {
          id: "cf-current",
          user_id: currentUserId,
          maand: currentMonth,
          cashflow_bedrag: 850,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "cf-prev1",
          user_id: currentUserId,
          maand: prevMonth,
          cashflow_bedrag: 650,
          created_at: prevDate.toISOString(),
          updated_at: prevDate.toISOString(),
        },
        {
          id: "cf-prev2",
          user_id: currentUserId,
          maand: prevMonth2,
          cashflow_bedrag: 480,
          created_at: prevDate2.toISOString(),
          updated_at: prevDate2.toISOString(),
        },
        {
          id: "cf-sarah-current",
          user_id: "member-sarah",
          maand: currentMonth,
          cashflow_bedrag: 1200,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "cf-sarah-prev",
          user_id: "member-sarah",
          maand: prevMonth,
          cashflow_bedrag: 1050,
          created_at: prevDate.toISOString(),
          updated_at: prevDate.toISOString(),
        },
      ];

    case "cashflow_history":
      return [
        {
          id: "cfh-1",
          user_id: currentUserId,
          amount: 850,
          previous_amount: 650,
          note: "Maandelijkse geautomatiseerde compound",
          changed_by: "system",
          changed_at: new Date().toISOString(),
        },
      ];

    case "flowlutas":
      return [
        {
          id: "flow-1",
          user_id: currentUserId,
          tier: 1,
          monthly_cashflow: 350,
          status: "active",
          activated_at: new Date(Date.now() - 45 * 86400000).toISOString(),
          next_activation_date: null,
          created_at: new Date(Date.now() - 50 * 86400000).toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "flow-2",
          user_id: currentUserId,
          tier: 2,
          monthly_cashflow: 500,
          status: "active",
          activated_at: new Date(Date.now() - 20 * 86400000).toISOString(),
          next_activation_date: null,
          created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "flow-3",
          user_id: currentUserId,
          tier: 3,
          monthly_cashflow: 750,
          status: "planned",
          activated_at: new Date().toISOString(),
          next_activation_date: new Date(Date.now() + 14 * 86400000).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

    case "tasks":
      return [
        {
          id: "task-1",
          user_id: currentUserId,
          title: "Profiel & Bankverificatie",
          description: "Controleer je uitbetalingsgegevens voor de maandelijkse cashflow uitkering.",
          status: "completed",
          priority: "high",
          type: "account",
          deadline: new Date(Date.now() - 5 * 86400000).toISOString(),
          created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
          updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
        },
        {
          id: "task-2",
          user_id: currentUserId,
          title: "Flowluta Tier 3 Strategie Beoordelen",
          description: "Bekijk de geplande parameters voor de volgende automatische compound cyclus.",
          status: "open",
          priority: "medium",
          type: "strategy",
          deadline: new Date(Date.now() + 7 * 86400000).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "task-3",
          user_id: currentUserId,
          title: "Deel je unieke Referral Link",
          description: "Nodig geïnteresseerde partners uit en ontvang 5% cashflow bonus per actieve Tier.",
          status: "open",
          priority: "low",
          type: "referral",
          deadline: new Date(Date.now() + 14 * 86400000).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

    case "spirits":
      return [
        {
          id: `spirit-${currentUserId}`,
          user_id: currentUserId,
          count: 4,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "spirit-sarah",
          user_id: "member-sarah",
          count: 8,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

    case "bel_loans":
      return [
        {
          id: `loan-${currentUserId}`,
          user_id: currentUserId,
          openstaand_bedrag: 2500,
          maandelijkse_aflossing: 150,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "loan-sarah",
          user_id: "member-sarah",
          openstaand_bedrag: 5000,
          maandelijkse_aflossing: 300,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

    default:
      return [];
  }
}
