import { useState } from "react";
import { firebaseStore } from "@/integrations/firebase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import AdminPortalLayout from "@/components/admin/AdminPortalLayout";
import { toast } from "sonner";
import {
  Users,
  Search,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar,
  UserCheck,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import type { Json } from "@/types/data-model";
import { withRoleGuard } from "@/utils/withRoleGuard";

type LeadGeneral = {
  [key: string]: Json | undefined;
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon?: string;
  woonplaats?: string;
  hoe_hoorde_u_van_ons?: string;
  referral?: string;
};

type RegistrationLead = {
  id: string;
  role: string;
  general: Json;
  status: string;
  created_at: string;
  answers: Json;
  updated_at: string;
};

type Lead = Omit<RegistrationLead, "general"> & { general: LeadGeneral };

function isLeadGeneral(value: unknown): value is LeadGeneral {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const general = value as Record<string, unknown>;
  return (
    typeof general.voornaam === "string" &&
    typeof general.achternaam === "string" &&
    typeof general.email === "string"
  );
}

const AdminLeads = () => {
  const queryClient = useQueryClient();
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: leads = [], isLoading, error } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await firebaseStore
        .collection("registration_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data as RegistrationLead[]).map((lead) => {
        const general: unknown =
          typeof lead.general === "string" ? (JSON.parse(lead.general) as unknown) : lead.general;
        if (!isLeadGeneral(general)) throw new Error("Lead bevat ongeldige contactgegevens.");
        return { ...lead, general };
      });
    },
    staleTime: 60 * 1000,
    retry: 1,
  });

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      const { error } = await firebaseStore
        .collection("registration_leads")
        .update({ status: newStatus })
        .eq("id", leadId);

      if (error) throw error;
      toast.success(`Status gewijzigd naar "${newStatus}"`);
      await queryClient.invalidateQueries({ queryKey: ["leads"] });
      if (selectedLead?.id === leadId) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch {
      toast.error("Kon de status niet bijwerken.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("Weet u zeker dat u deze lead wilt verwijderen?")) return;
    setIsUpdating(true);
    try {
      const { error } = await firebaseStore.collection("registration_leads").delete().eq("id", leadId);
      if (error) throw error;
      toast.success("Lead succesvol verwijderd");
      setSelectedLead(null);
      await queryClient.invalidateQueries({ queryKey: ["leads"] });
    } catch {
      toast.error("Kon de lead niet verwijderen.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConvertToMember = async (lead: Lead) => {
    setIsUpdating(true);
    try {
      // 1. Create or ensure profile
      await firebaseStore.collection("profiles").insert({
        id: lead.id,
        email: lead.general.email,
        voornaam: lead.general.voornaam,
        achternaam: lead.general.achternaam,
        telefoonnummer: lead.general.telefoon || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      // 2. Mark lead as converted
      await firebaseStore
        .collection("registration_leads")
        .update({ status: "converted" })
        .eq("id", lead.id);

      toast.success(`${lead.general.voornaam} is geconverteerd naar Member!`);
      await queryClient.invalidateQueries({ queryKey: ["leads"] });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      setSelectedLead(null);
    } catch {
      toast.error("Fout bij converteren naar member.");
    } finally {
      setIsUpdating(false);
    }
  };

  const exportToCSV = () => {
    if (!leads.length) {
      toast.error("Geen leads om te exporteren.");
      return;
    }
    const headers = ["ID", "Voornaam", "Achternaam", "Email", "Telefoon", "Woonplaats", "Rol", "Status", "Aangemeld op"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.general.voornaam || ""}"`,
      `"${l.general.achternaam || ""}"`,
      `"${l.general.email || ""}"`,
      `"${l.general.telefoon || ""}"`,
      `"${l.general.woonplaats || ""}"`,
      `"${l.role || ""}"`,
      `"${l.status || ""}"`,
      `"${new Date(l.created_at).toLocaleDateString("nl-NL")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `investbotiq-leads-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Leads geëxporteerd naar CSV");
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesRole = roleFilter === "all" || lead.role === roleFilter;
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      lead.general.voornaam.toLowerCase().includes(searchLower) ||
      lead.general.achternaam.toLowerCase().includes(searchLower) ||
      lead.general.email.toLowerCase().includes(searchLower) ||
      (lead.general.woonplaats && lead.general.woonplaats.toLowerCase().includes(searchLower));
    return matchesRole && matchesStatus && matchesSearch;
  });

  const countNew = leads.filter((l) => l.status === "new").length;
  const countContacted = leads.filter((l) => l.status === "contacted").length;
  const countConverted = leads.filter((l) => l.status === "converted").length;

  return (
    <AdminPortalLayout>
      <div className="space-y-6">

        {/* Header Title & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Leads & Aanmeldingen</h2>
            <p className="text-muted-foreground text-sm">
              Beheer alle binnenkomende registratieleads, intake-antwoorden en conversies.
            </p>
          </div>
          <button
            type="button"
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 rounded-xl border border-input bg-background px-4 py-2 text-sm font-semibold hover:bg-accent transition"
          >
            <Download className="h-4 w-4" />
            Exporteer CSV
          </button>
        </div>

        {/* Lead Statistics KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Totaal Leads</span>
              <Users className="h-4 w-4 text-indigo-500" />
            </div>
            <p className="text-2xl font-bold">{leads.length}</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Nieuw</span>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-amber-500">{countNew}</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Gecontacteerd</span>
              <Sparkles className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-500">{countContacted}</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Geconverteerd</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-emerald-500">{countConverted}</p>
          </Card>
        </div>

        {/* Filter Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Zoek op naam, email of stad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter op rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Rollen</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="ouder">Ouder</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="ondernemer">Ondernemer</SelectItem>
                  <SelectItem value="artiest">Artiest</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter op status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Statussen</SelectItem>
                  <SelectItem value="new">Nieuw</SelectItem>
                  <SelectItem value="contacted">Gecontacteerd</SelectItem>
                  <SelectItem value="converted">Geconverteerd</SelectItem>
                  <SelectItem value="archived">Gearchiveerd</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Overzicht Leads ({filteredLeads.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12 text-sm text-indigo-500 animate-pulse">Leads laden…</div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertDescription>Er is een fout opgetreden bij het laden van de leads.</AlertDescription>
              </Alert>
            ) : filteredLeads.length === 0 ? (
              <p className="text-center text-muted-foreground py-10 text-sm">
                Geen leads gevonden die voldoen aan de zoekcriteria.
              </p>
            ) : (
              <div className="space-y-3">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-indigo-300 dark:hover:border-indigo-700 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-base">
                          {lead.general.voornaam} {lead.general.achternaam}
                        </span>
                        <Badge variant="outline" className="capitalize text-xs">
                          {lead.role}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" />
                          {lead.general.email}
                        </span>
                        {lead.general.telefoon && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5" />
                            {lead.general.telefoon}
                          </span>
                        )}
                        {lead.general.woonplaats && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {lead.general.woonplaats}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(lead.created_at).toLocaleDateString("nl-NL")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                      {/* Status Selector */}
                      <Select
                        value={lead.status}
                        onValueChange={(val) => handleStatusChange(lead.id, val)}
                        disabled={isUpdating}
                      >
                        <SelectTrigger className="w-32 h-8 text-xs font-semibold">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Nieuw</SelectItem>
                          <SelectItem value="contacted">Gecontacteerd</SelectItem>
                          <SelectItem value="converted">Geconverteerd</SelectItem>
                          <SelectItem value="archived">Gearchiveerd</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Detail View Button */}
                      <button
                        type="button"
                        onClick={() => setSelectedLead(lead)}
                        className="p-2 rounded-lg border border-input hover:bg-accent text-foreground transition"
                        title="Bekijk details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {/* Convert to Member Button */}
                      {lead.status !== "converted" && (
                        <button
                          type="button"
                          onClick={() => handleConvertToMember(lead)}
                          disabled={isUpdating}
                          className="p-2 rounded-lg bg-emerald-600/10 text-emerald-600 border border-emerald-600/20 hover:bg-emerald-600/20 transition"
                          title="Zet om naar Member"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteLead(lead.id)}
                        disabled={isUpdating}
                        className="p-2 rounded-lg bg-red-600/10 text-red-600 border border-red-600/20 hover:bg-red-600/20 transition"
                        title="Verwijder lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lead Details Dialog */}
        <Dialog open={selectedLead !== null} onOpenChange={(open) => !open && setSelectedLead(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Lead Dossier: {selectedLead?.general.voornaam} {selectedLead?.general.achternaam}
              </DialogTitle>
              <DialogDescription>
                Aangemeld op {selectedLead ? new Date(selectedLead.created_at).toLocaleString("nl-NL") : ""}
              </DialogDescription>
            </DialogHeader>

            {selectedLead && (
              <div className="space-y-4 py-2 text-sm">
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                  <div>
                    <span className="text-xs text-muted-foreground block">Email</span>
                    <span className="font-semibold">{selectedLead.general.email}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Telefoon</span>
                    <span className="font-semibold">{selectedLead.general.telefoon || "Niet opgegeven"}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Woonplaats</span>
                    <span className="font-semibold">{selectedLead.general.woonplaats || "Niet opgegeven"}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Gekozen Rol</span>
                    <Badge variant="outline" className="capitalize text-xs mt-0.5">{selectedLead.role}</Badge>
                  </div>
                  {selectedLead.general.hoe_hoorde_u_van_ons && (
                    <div className="col-span-2">
                      <span className="text-xs text-muted-foreground block">Kanaal van herkomst</span>
                      <span className="font-medium">{String(selectedLead.general.hoe_hoorde_u_van_ons)}</span>
                    </div>
                  )}
                  {selectedLead.general.referral && (
                    <div className="col-span-2">
                      <span className="text-xs text-muted-foreground block">Referral Bron</span>
                      <span className="font-medium text-indigo-500">{String(selectedLead.general.referral)}</span>
                    </div>
                  )}
                </div>

                {/* Answers / Questionnaire */}
                {selectedLead.answers && typeof selectedLead.answers === "object" && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Ingevulde Intake Antwoorden
                    </h4>
                    <div className="rounded-xl border border-border p-3 space-y-2 bg-card">
                      {Object.entries(selectedLead.answers as Record<string, unknown>).map(([key, val]) => (
                        <div key={key} className="text-xs border-b border-border/50 pb-1.5 last:border-none last:pb-0">
                          <span className="text-muted-foreground font-medium block capitalize">
                            {key.replace(/_/g, " ")}:
                          </span>
                          <span className="font-semibold text-foreground">
                            {typeof val === "object" ? JSON.stringify(val) : String(val)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <DialogFooter className="flex flex-row justify-between sm:justify-between items-center gap-2">
              {selectedLead && selectedLead.status !== "converted" ? (
                <button
                  type="button"
                  onClick={() => handleConvertToMember(selectedLead)}
                  disabled={isUpdating}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
                >
                  <UserCheck className="h-4 w-4" />
                  Zet om naar Member
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="rounded-xl border border-input px-4 py-2 text-xs font-semibold hover:bg-accent transition"
              >
                Sluiten
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPortalLayout>
  );
};

export default withRoleGuard(AdminLeads, ["admin"]);
