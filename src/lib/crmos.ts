/**
 * CRMos REST API Client — Bi-directionele AI Agent Integratie
 * 
 * Volledige integratiegids voor InvestBotIQ & het ecosysteem:
 * - Lezen: contacts, search, teams, companies, deals, candidates
 * - Schrijven: contacts/upsert, contacts, patch, deals, activities, candidates
 */

export interface CRMosContact {
  id?: string;
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  company?: string;
  company_tags?: string[];
  tags?: string[];
  notes?: string;
  status?: "lead" | "qualified" | "customer" | "churned" | string;
  vvc_tag?: string;
  created_at?: string;
  updated_at?: string;
}

export type CRMosContactUpsert = CRMosContact;
export type CRMosContactCreate = CRMosContact;

export interface CRMosDeal {
  id?: string;
  name: string;
  value: number;
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "won" | "lost" | string;
  company_name?: string;
  contact_id?: string;
  probability?: number;
  expected_close_date?: string;
  notes?: string;
}

export type CRMosDealCreate = CRMosDeal;

export interface CRMosActivity {
  id?: string;
  contact_id?: string;
  deal_id?: string;
  type: "call" | "email" | "meeting" | "note" | "task" | "application" | "inquiry" | "registration" | string;
  title: string;
  description: string;
  performed_by?: string;
  created_at?: string;
}

export type CRMosActivityCreate = CRMosActivity;

export interface CRMosCandidate {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  skills?: string[];
  experience_years?: number;
  location?: string;
  notes?: string;
  vacancy_id?: string;
  contract_type?: string;
  hours?: string;
  cv_link?: string;
  status?: "applied" | "reviewing" | "interviewed" | "placed" | "rejected" | string;
}

export type CRMosCandidateCreate = CRMosCandidate;

export interface CRMosTeam {
  id: string;
  name: string;
  leader_name?: string;
  leader_email?: string;
  company?: string;
  members_count?: number;
}

export interface CRMosCompany {
  id: string;
  name: string;
  tag: string;
  description?: string;
  deals_count?: number;
  contacts_count?: number;
}

export interface CRMosSearchResult {
  contacts?: CRMosContact[];
  deals?: CRMosDeal[];
  candidates?: CRMosCandidate[];
  teams?: CRMosTeam[];
}

export interface CRMosApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Officiële Ecosystem API Keys per bedrijf binnen de holding
 */
export const CRM_ECOSYSTEM_KEYS: Record<string, { key: string; tag: string; company: string }> = {
  master: { key: "crm_live_master_jamaldrenthe_2026_all_ecosystem", tag: "#all", company: "Alle Bedrijven (Master)" },
  vvc: { key: "crm_live_vvc_verdienende_vrienden_club_2026", tag: "#vvc", company: "VVC" },
  spontiva: { key: "crm_live_spontiva_recruitment_2026", tag: "#spontiva", company: "Spontiva" },
  boostplug: { key: "crm_live_boostplug_energy_iot_2026", tag: "#boostplug", company: "Boostplug" },
  quantum_initium: { key: "crm_live_quantum_initium_enterprise_2026", tag: "#quantum-initium", company: "Quantum Initium" },
  immigratiepunt: { key: "crm_live_immigratiepunt_portal_2026", tag: "#immigratiepunt", company: "Immigratiepunt" },
  woningvry: { key: "crm_live_woningvry_realestate_2026", tag: "#woningvry", company: "Woningvry" },
  djobba: { key: "crm_live_djobba_works_freelance_2026", tag: "#djobba-works", company: "Djobba.works" },
  trusting_work: { key: "crm_live_trusting_work_staffing_2026", tag: "#trusting-work", company: "Trusting Work" },
  logs_rent: { key: "crm_live_logs_rent_logistics_2026", tag: "#logs-rent", company: "Logs.rent" },
  zheavenzy: { key: "crm_live_zheavenzy_atelier_2026", tag: "#zheavenzy", company: "Zheavenzy" },
  xabi_world: { key: "crm_live_xabi_world_international_2026", tag: "#xabi-world", company: "Xabi World" },
  crmos: { key: "crm_live_crmos_core_platform_2026", tag: "#crmos", company: "CRMos Platform" },
};

class CRMosClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl =
      (import.meta.env.VITE_CRMOS_BASE_URL as string | undefined) ||
      "https://crmos.one/api/v1";
    this.apiKey =
      (import.meta.env.VITE_CRMOS_API_KEY as string | undefined) ||
      "crm_live_master_jamaldrenthe_2026_all_ecosystem";
  }

  /** Stel dynamisch een afwijkende Base URL in (bijv. dev http://localhost:5173/api/v1) */
  public setBaseUrl(url: string) {
    this.baseUrl = url.replace(/\/+$/, "");
  }

  /** Stel dynamisch een afwijkende API Key in */
  public setApiKey(key: string) {
    this.apiKey = key;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  private getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      "X-CRMOS-API-KEY": this.apiKey,
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<CRMosApiResponse<T>> {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${this.baseUrl}${cleanEndpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...(options.headers || {}),
        },
      });

      const contentType = response.headers.get("content-type") || "";
      let data: any = null;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text };
      }

      if (!response.ok) {
        console.warn(`[CRMos API] ${response.status} ${response.statusText} op ${url}:`, data);
        return {
          success: false,
          error: data?.error || data?.message || `HTTP ${response.status}: ${response.statusText}`,
          data,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (err) {
      console.warn(`[CRMos API] Netwerkfout bij request naar ${url}:`, err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Netwerkfout bij verbinden met CRMos",
      };
    }
  }

  // =========================================================================
  // 1. DATA OPHALEN & REALTIME ZOEKEN (GET)
  // =========================================================================

  /**
   * Dedicated Health check: GET /api/v1/health
   */
  public async getHealth(): Promise<{ status: string; online: boolean; latencyMs: number }> {
    const start = performance.now();
    try {
      const res = await this.request<{ status: string }>("/health", { method: "GET" });
      const latencyMs = Math.round(performance.now() - start);
      return {
        status: res.data?.status || (res.success ? "online" : "offline"),
        online: res.success,
        latencyMs,
      };
    } catch {
      const latencyMs = Math.round(performance.now() - start);
      return { status: "offline", online: false, latencyMs };
    }
  }

  /**
   * VVC Tag Lookup & Verificatie: GET /api/v1/vvc/lookup?tag={tag}
   */
  public async vvcLookup(tag: string): Promise<CRMosApiResponse<any>> {
    return this.request(`/vvc/lookup?tag=${encodeURIComponent(tag)}`, { method: "GET" });
  }

  /**
   * Health/Ping check voor telemetry monitoring van de CRMos REST verbinding
   */
  public async ping(): Promise<{ ok: boolean; status: number; latencyMs: number; error?: string }> {
    const start = performance.now();
    try {
      const res = await fetch(`${this.baseUrl}/search?q=health_ping`, {
        method: "GET",
        headers: this.getHeaders(),
      });
      const latencyMs = Math.round(performance.now() - start);
      return {
        ok: res.ok || res.status === 404, // 404 means server reached and responded
        status: res.status,
        latencyMs,
      };
    } catch (err) {
      const latencyMs = Math.round(performance.now() - start);
      return {
        ok: false,
        status: 0,
        latencyMs,
        error: err instanceof Error ? err.message : "Netwerkfout",
      };
    }
  }

  /**
   * Universeel Zoeken: GET /api/v1/search?q={zoekterm}
   * Doorzoekt direct alle contacten, deals, kandidaten en teams tegelijk.
   */
  public async search(query: string): Promise<CRMosApiResponse<CRMosSearchResult>> {
    return this.request<CRMosSearchResult>(`/search?q=${encodeURIComponent(query)}`, {
      method: "GET",
    });
  }

  /**
   * Contacten Ophalen & Filteren:
   * GET /api/v1/contacts?q={naam_of_email}&company_tag={tag}&tag={tag}
   */
  public async getContacts(params?: {
    q?: string;
    company_tag?: string;
    tag?: string;
  }): Promise<CRMosApiResponse<CRMosContact[]>> {
    const searchParams = new URLSearchParams();
    if (params?.q) searchParams.set("q", params.q);
    if (params?.company_tag) searchParams.set("company_tag", params.company_tag);
    if (params?.tag) searchParams.set("tag", params.tag);

    const query = searchParams.toString();
    const endpoint = query ? `/contacts?${query}` : "/contacts";
    return this.request<CRMosContact[]>(endpoint, { method: "GET" });
  }

  /**
   * Enkel contact op ID ophalen: GET /api/v1/contacts/{id}
   */
  public async getContactById(id: string): Promise<CRMosApiResponse<CRMosContact>> {
    return this.request<CRMosContact>(`/contacts/${encodeURIComponent(id)}`, {
      method: "GET",
    });
  }

  /**
   * Referral Teams & Kernleiders ophalen: GET /api/v1/teams
   */
  public async getTeams(): Promise<CRMosApiResponse<CRMosTeam[]>> {
    return this.request<CRMosTeam[]>("/teams", { method: "GET" });
  }

  /**
   * Bedrijven ophalen: GET /api/v1/companies
   */
  public async getCompanies(): Promise<CRMosApiResponse<CRMosCompany[]>> {
    return this.request<CRMosCompany[]>("/companies", { method: "GET" });
  }

  /**
   * Deals / Verkoopkansen ophalen per bedrijf: GET /api/v1/deals?company={bedrijf}
   */
  public async getDeals(company?: string): Promise<CRMosApiResponse<CRMosDeal[]>> {
    const endpoint = company ? `/deals?company=${encodeURIComponent(company)}` : "/deals";
    return this.request<CRMosDeal[]>(endpoint, { method: "GET" });
  }

  /**
   * Kandidaten & Sollicitanten ophalen: GET /api/v1/candidates
   */
  public async getCandidates(): Promise<CRMosApiResponse<CRMosCandidate[]>> {
    return this.request<CRMosCandidate[]>("/candidates", { method: "GET" });
  }

  // =========================================================================
  // 2. DATA TERUGSCHRIJVEN & VERRIJKEN (POST, PUT, PATCH)
  // =========================================================================

  /**
   * Contact Inschrijven of Slim Verrijken (Upsert): POST /api/v1/contacts/upsert
   * Als het contact (op basis van e-mail of vvc_tag) al bestaat, wordt het verrijkt.
   * Bestaat het nog niet, dan wordt het automatisch aangemaakt.
   */
  public async upsertContact(contact: CRMosContactUpsert): Promise<CRMosApiResponse<CRMosContact>> {
    return this.request<CRMosContact>("/contacts/upsert", {
      method: "POST",
      body: JSON.stringify(contact),
    });
  }

  /**
   * Nieuw Contact Aanmaken: POST /api/v1/contacts
   */
  public async createContact(contact: CRMosContactCreate): Promise<CRMosApiResponse<CRMosContact>> {
    return this.request<CRMosContact>("/contacts", {
      method: "POST",
      body: JSON.stringify(contact),
    });
  }

  /**
   * Bestaand Contact Bijwerken: PATCH /api/v1/contacts/{id}
   */
  public async updateContact(
    id: string,
    updates: Partial<CRMosContact>
  ): Promise<CRMosApiResponse<CRMosContact>> {
    return this.request<CRMosContact>(`/contacts/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  }

  /**
   * Deal / Verkoopkans Inschrijven in de Sales Pipeline: POST /api/v1/deals
   */
  public async createDeal(deal: CRMosDealCreate): Promise<CRMosApiResponse<CRMosDeal>> {
    return this.request<CRMosDeal>("/deals", {
      method: "POST",
      body: JSON.stringify(deal),
    });
  }

  /**
   * Activiteit / Gespreksnotitie Loggen: POST /api/v1/activities
   */
  public async createActivity(activity: CRMosActivityCreate): Promise<CRMosApiResponse<CRMosActivity>> {
    return this.request<CRMosActivity>("/activities", {
      method: "POST",
      body: JSON.stringify(activity),
    });
  }

  /**
   * No Cure No Pay Sollicitant Inschrijven: POST /api/v1/candidates
   */
  public async createCandidate(candidate: CRMosCandidateCreate): Promise<CRMosApiResponse<CRMosCandidate>> {
    return this.request<CRMosCandidate>("/candidates", {
      method: "POST",
      body: JSON.stringify(candidate),
    });
  }

  /**
   * Webhook Registreren (CRMos ➡️ Externe Agent): POST /api/v1/webhooks
   */
  public async registerWebhook(payload: {
    company: string;
    url: string;
    events: string[];
    secret?: string;
  }): Promise<CRMosApiResponse<unknown>> {
    return this.request("/webhooks", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  // =========================================================================
  // 3. INVESTBOTIQ SLIMME ECOSYSTEEM SYNCHRONISATIE HELPERS
  // =========================================================================

  /**
   * Schrijft een vacaturesollicitatie simultaan in als CRMos Candidate én verrijkt Contact
   */
  public async syncCareerApplication(payload: {
    name: string;
    email: string;
    phone?: string;
    linkedin?: string;
    vacancyId: string;
    vacancyTitle: string;
    domain: string;
    contractType: string;
    hours: string;
    cvLink?: string;
    motivation?: string;
  }): Promise<{ contactSuccess: boolean; candidateSuccess: boolean }> {
    const nameParts = payload.name.trim().split(" ");
    const firstName = nameParts[0] || payload.name;
    const lastName = nameParts.slice(1).join(" ") || "";

    const candidatePayload: CRMosCandidateCreate = {
      first_name: firstName,
      last_name: lastName,
      email: payload.email.trim(),
      phone: payload.phone?.trim() || undefined,
      skills: [payload.vacancyTitle, payload.domain, payload.contractType],
      experience_years: 3,
      location: "100% Remote",
      notes: `Sollicitatie [${payload.vacancyId}] ${payload.vacancyTitle}. Motivatie: ${payload.motivation || "N/A"}. CV Link: ${payload.cvLink || "N/A"}`,
      vacancy_id: payload.vacancyId,
      contract_type: payload.contractType,
      hours: payload.hours,
      cv_link: payload.cvLink,
      status: "applied",
    };

    const contactUpsertPayload: CRMosContactUpsert = {
      first_name: firstName,
      last_name: lastName,
      email: payload.email.trim(),
      phone: payload.phone?.trim() || undefined,
      company: "InvestBotIQ Ecosysteem Werving",
      company_tags: ["#investbotiq", "#careers", `#vacature_${payload.vacancyId}`],
      tags: ["Sollicitant", "AI Recruitment", `#vacature_${payload.vacancyId}`, payload.domain],
      notes: `Sollicitatie ontvangen voor [${payload.vacancyId}] ${payload.vacancyTitle} (${payload.contractType}, ${payload.hours}). LinkedIn: ${payload.linkedin || "N/A"}`,
      status: "qualified",
    };

    const [candidateRes, contactRes] = await Promise.all([
      this.createCandidate(candidatePayload),
      this.upsertContact(contactUpsertPayload),
    ]);

    // Log ook een activiteit
    await this.createActivity({
      contact_id: contactRes.data?.id,
      type: "application",
      title: `Nieuwe Sollicitatie: [${payload.vacancyId}] ${payload.vacancyTitle}`,
      description: `Kandidaat ${payload.name} heeft gesolliciteerd op rol ${payload.vacancyTitle} (${payload.hours}, ${payload.contractType}).`,
      performed_by: "InvestBotIQ AI Career Portal",
    }).catch(() => {
      // Optionele activity logging failsafed
    });

    return {
      contactSuccess: contactRes.success,
      candidateSuccess: candidateRes.success,
    };
  }

  /**
   * Schrijft een contactformulier-lead in CRMos in via Contact Upsert + Activity
   */
  public async syncContactLead(payload: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): Promise<boolean> {
    const nameParts = payload.name.trim().split(" ");
    const firstName = nameParts[0] || payload.name;
    const lastName = nameParts.slice(1).join(" ") || "";

    const contactUpsertPayload: CRMosContactUpsert = {
      first_name: firstName,
      last_name: lastName,
      email: payload.email.trim(),
      company: "InvestBotIQ Lead",
      company_tags: ["#investbotiq"],
      tags: ["Website Contact", "InvestBotIQ Lead", payload.subject || "Algemeen"].filter(Boolean),
      notes: `Bericht via Contactpagina: "${payload.message}" (Onderwerp: ${payload.subject || "Geen onderwerp"})`,
      status: "lead",
    };

    const res = await this.upsertContact(contactUpsertPayload);

    await this.createActivity({
      contact_id: res.data?.id,
      type: "inquiry",
      title: `Contactaanvraag: ${payload.subject || "Algemeen"}`,
      description: payload.message,
      performed_by: "InvestBotIQ Website Contactformulier",
    }).catch(() => {});

    return res.success;
  }

  /**
   * Schrijft een nieuwe member of affiliate registratie in CRMos in
   */
  public async syncRegistrationLead(payload: {
    name: string;
    email: string;
    phone?: string;
    role: string;
    city?: string;
    referral?: string;
    answers?: Record<string, string>;
  }): Promise<boolean> {
    const nameParts = payload.name.trim().split(" ");
    const firstName = nameParts[0] || payload.name;
    const lastName = nameParts.slice(1).join(" ") || "";

    const contactUpsertPayload: CRMosContactUpsert = {
      first_name: firstName,
      last_name: lastName,
      email: payload.email.trim(),
      phone: payload.phone?.trim() || undefined,
      company: `InvestBotIQ ${payload.role.toUpperCase()}`,
      company_tags: ["#investbotiq", `#role_${payload.role}`],
      tags: ["InvestBotIQ Registratie", `Rol: ${payload.role}`, payload.city ? `Woonplaats: ${payload.city}` : ""].filter(Boolean),
      notes: `Nieuwe account-aanmelding als ${payload.role}. Woonplaats: ${payload.city || "Onbekend"}. Referral: ${payload.referral || "Geen"}.`,
      status: "qualified",
    };

    const res = await this.upsertContact(contactUpsertPayload);

    await this.createActivity({
      contact_id: res.data?.id,
      type: "registration",
      title: `Nieuwe Registratie (${payload.role})`,
      description: `Gebruiker ${payload.name} (${payload.email}) heeft zich aangemeld als ${payload.role}.`,
      performed_by: "InvestBotIQ Registration Onboarding Flow",
    }).catch(() => {});

    return res.success;
  }
}

export const crmos = new CRMosClient();
export default crmos;
