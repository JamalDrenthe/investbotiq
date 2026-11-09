# CRMos REST API — Ecosysteem Integratiegids & Universele Spelregels
**Voor alle agents en websites in het ecosysteem:** *InvestBotIQ, VVC, Spontiva, Boostplug, Quantum Initium, Immigratiepunt, Woningvry, Djobba.works, Trusting Work, Logs.rent, Zheavenzy, Xabi World, CRMos Platform.*

---

## 1. Authenticatie & Headers

Elke agent moet bij elk request naar `https://crmos.one/api/v1/*` de volgende headers meesturen:

```http
Content-Type: application/json
X-CRMOS-API-KEY: <HUN_EIGEN_API_KEY>
```

### Overzicht API Keys per Bedrijf
| Bedrijf | API Key (`X-CRMOS-API-KEY`) | Bedrijfstag |
| :--- | :--- | :--- |
| **Alle Bedrijven (Master)** | `crm_live_master_jamaldrenthe_2026_all_ecosystem` | `#all` |
| **VVC** | `crm_live_vvc_verdienende_vrienden_club_2026` | `#vvc` |
| **Spontiva** | `crm_live_spontiva_recruitment_2026` | `#spontiva` |
| **Boostplug** | `crm_live_boostplug_energy_iot_2026` | `#boostplug` |
| **Quantum Initium** | `crm_live_quantum_initium_enterprise_2026` | `#quantum-initium` |
| **Immigratiepunt** | `crm_live_immigratiepunt_portal_2026` | `#immigratiepunt` |
| **Woningvry** | `crm_live_woningvry_realestate_2026` | `#woningvry` |
| **Djobba.works** | `crm_live_djobba_works_freelance_2026` | `#djobba-works` |
| **Trusting Work** | `crm_live_trusting_work_staffing_2026` | `#trusting-work` |
| **Logs.rent** | `crm_live_logs_rent_logistics_2026` | `#logs-rent` |
| **Zheavenzy** | `crm_live_zheavenzy_atelier_2026` | `#zheavenzy` |
| **Xabi World** | `crm_live_xabi_world_international_2026` | `#xabi-world` |
| **CRMos Platform** | `crm_live_crmos_core_platform_2026` | `#crmos` |

---

## 2. Inbound Data Sturen naar CRMos

### A. Leads, Klanten of Nieuwe Contacten (`POST /api/v1/contacts/upsert`)
Agents moeten **altijd `POST /api/v1/contacts/upsert`** gebruiken. CRMos matcht automatisch op `LOWER(TRIM(email))`:
- **Bestaat het contact al?** CRMos wist nooit oude data, voegt de nieuwe tags samen en plakt de notitie met timestamp onderaan de historie.
- **Bestaat het contact nog niet?** CRMos maakt het contact direct aan met een unieke VVC-tag.

```json
{
  "first_name": "Lars",
  "last_name": "Bakker",
  "email": "lars.bakker@voorbeeld.nl",
  "phone": "+31612345678",
  "company": "Spontiva",
  "tags": ["#spontiva", "B2B Lead"],
  "notes": "Aanvraag via Spontiva portal voor IT-detachering."
}
```

### B. Sollicitanten / No Cure No Pay Kandidaten (`POST /api/v1/candidates`)
Als een partnerwebsite (zoals Spontiva, InvestBotIQ of Djobba) een sollicitant binnenkrijgt:

```json
{
  "first_name": "Sanne",
  "last_name": "de Jong",
  "email": "sanne.dejong@voorbeeld.nl",
  "phone": "+31687654321",
  "role_applied": "360° Recruiter",
  "deal_model": "no_cure_no_pay",
  "company": "Spontiva",
  "tags": ["#spontiva", "#careers", "Sollicitant"],
  "notes": "Sollicitatie ontvangen voor 360 Recruiter positie."
}
```
*(CRMos registreert de sollicitant in de wervingsfunnel én koppelt/upsert direct het contact in het centrale CRM).*

### C. Deals / Verkooporders (`POST /api/v1/deals`)
Als een agent een deal registreert (bijv. Boostplug laadpaal-deal of Quantum Initium compute licentie):

```json
{
  "name": "Boostplug Fastcharger Pilot - Jansen Transport",
  "value": 35000,
  "stage": "qualified",
  "company_name": "boostplug",
  "contact_email": "directie@jansentransport.nl",
  "notes": "Offerteaanvraag ontvangen voor 4x DC Snelladers."
}
```

---

## 3. Data Opvragen & Realtime Zoeken

- **Health check voor statusbots:**
  `GET https://crmos.one/api/v1/health`  
  *(Geeft direct `HTTP 200 OK` met `{"status": "online"}` terug).*
- **Realtime zoeken over alles (contacten, deals, kandidaten, teams):**
  `GET https://crmos.one/api/v1/search?q=Lars`
- **Specifiek contact op e-mailadres controleren:**
  `GET https://crmos.one/api/v1/contacts?email=lars.bakker@voorbeeld.nl`
- **VVC Tag verifiëren:**
  `GET https://crmos.one/api/v1/vvc/lookup?tag=VVC-REYHAN-0101`

---

## 4. Live Updates Terugkrijgen (Webhooks: CRMos ➡️ Externe Agent)

Als een andere agent (bijv. van Boostplug, VVC of Spontiva) automatisch wil weten wanneer een deal in CRMos op **`won`** wordt gezet of een kandidaat op **`placed` / `hired`**:

1. **Lever een webhook endpoint op jouw domein**, bijv.:
   `https://spontiva.nl/api/webhooks/crmos`
2. **Registreer de webhook eenmalig bij CRMos** via:
   ```bash
   curl -X POST "https://crmos.one/api/v1/webhooks" \
     -H "Content-Type: application/json" \
     -H "X-CRMOS-API-KEY: crm_live_spontiva_recruitment_2026" \
     -d '{
       "company": "Spontiva",
       "url": "https://spontiva.nl/api/webhooks/crmos",
       "events": ["candidate.placed", "deal.won", "contact.upserted"],
       "secret": "whsec_spontiva_crmos_2026"
     }'
   ```
3. Zodra een teamleider in CRMos de status aanpast, schiet CRMos direct een webhook met `X-CRMOS-Event` en de data naar jouw server, zodat gebruikersrechten of portal-rechten automatisch worden geüpgraded.

---

## 📋 Kopieerbare Instructie voor Externe Agents & Ontwikkelaars

> **Instructie voor Externe Agent:**  
> Koppel jouw applicatie rechtstreeks met de centrale CRMos Cloud API via `https://crmos.one/api/v1/*`.  
> 1. Gebruik bij elk request de header `X-CRMOS-API-KEY: <JOUW_KEY>` en `Content-Type: application/json`.  
> 2. Test connectiviteit via `GET https://crmos.one/api/v1/health`.  
> 3. Stuur leads/aanmeldingen altijd via `POST https://crmos.one/api/v1/contacts/upsert` met minimaal `email`, `first_name`, `tags` (inclusief `#jouwbedrijf`) en `notes`. CRMos dedupliceert automatisch op e-mail en voegt tags en notities samen zonder eerdere data te wissen.  
> 4. Stuur vacature-sollicitaties via `POST https://crmos.one/api/v1/candidates` en deals via `POST https://crmos.one/api/v1/deals`.  
> 5. CORS en HTTP `OPTIONS` preflights worden door CRMos direct met `204 No Content` geaccepteerd, dus directe calls vanuit webbrowsers werken zonder proxy.
