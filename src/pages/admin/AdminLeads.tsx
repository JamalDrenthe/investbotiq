
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AdminNavBar } from "@/components/admin/AdminNavBar";
import Header from "@/components/Header";
import { Json } from "@/integrations/supabase/types";
import { withRoleGuard } from "@/utils/withRoleGuard";

type Lead = {
  id: string;
  role: string;
  general: {
    voornaam: string;
    achternaam: string;
    email: string;
    [key: string]: any;
  };
  status: string;
  created_at: string;
  answers: any;
  updated_at: string;
};

type SupabaseLead = {
  id: string;
  role: string;
  general: Json;
  status: string;
  created_at: string;
  answers: Json;
  updated_at: string;
}

const AdminLeads = () => {
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: leads = [], isLoading, error } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("registration_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our Lead type
      return (data as SupabaseLead[]).map(lead => ({
        ...lead,
        general: typeof lead.general === 'string' 
          ? JSON.parse(lead.general) 
          : lead.general as Lead['general']
      })) as Lead[];
    },
    // Ensure error handling is done properly for React Query v5+
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1
  });

  const filteredLeads = leads?.filter(lead => {
    const matchesRole = roleFilter === "all" || lead.role === roleFilter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === "" || 
      lead.general.voornaam?.toLowerCase().includes(searchLower) ||
      lead.general.achternaam?.toLowerCase().includes(searchLower) ||
      lead.general.email?.toLowerCase().includes(searchLower);
    
    return matchesRole && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Orbs voor branding en sfeer */}
      <div className="pointer-events-none select-none">
        <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-indigo-200 rounded-full opacity-20 blur-3xl z-0 animate-fade-in" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-pink-200 rounded-full opacity-20 blur-2xl z-0 animate-fade-in" />
      </div>
      <Header />
      <div className="container mx-auto px-2 md:px-6 py-6 relative z-10">
        <AdminNavBar />
        <h2 className="text-2xl font-bold mb-2 tracking-tight text-ink flex items-center gap-2">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block align-middle text-indigo-500"><circle cx="12" cy="12" r="12" fill="#eef2ff" /><path d="M7 13l3 3 7-7" stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Leads Overzicht
        </h2>
        <p className="text-muted-foreground mb-4">
          Beheer alle leads die zijn binnengekomen via het aanmeldformulier.
        </p>
        <Card className="shadow-xl animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-indigo-700">Lead Overzicht</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Input
                placeholder="Zoeken op naam of email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter op rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle rollen</SelectItem>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="ouder">Ouder</SelectItem>
                  <SelectItem value="affiliated">Affiliated</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="ondernemer">Ondernemer</SelectItem>
                  <SelectItem value="artiest">Artiest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isLoading ? (
              <div className="text-center py-12 text-lg text-indigo-500 animate-pulse">Laden...</div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertDescription>Er is een fout opgetreden bij het laden van de leads.</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                {filteredLeads?.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Geen leads gevonden die voldoen aan de filteropties
                  </p>
                ) : (
                  filteredLeads?.map((lead) => (
                    <Card
                      key={lead.id}
                      className="transition-all duration-200 hover:shadow-2xl hover:scale-[1.012] border-indigo-100 hover:border-indigo-300 group"
                    >
                      <CardContent className="pt-6 pb-4">
                        <div className="grid md:grid-cols-4 gap-4 items-center">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Naam</p>
                            <p className="font-medium text-ink">{lead.general.voornaam} {lead.general.achternaam}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Email</p>
                            <p className="font-medium text-ink">{lead.general.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Rol</p>
                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize shadow-sm bg-indigo-50 text-indigo-700 border border-indigo-100 group-hover:bg-indigo-100 transition-all`}>{lead.role}</span>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Aangemeld op</p>
                            <p className="font-medium text-ink">{new Date(lead.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
                          <Button variant="outline" size="sm" className="group-hover:border-indigo-400 group-hover:text-indigo-700 transition-all">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="inline mr-1"><path d="M15 12H9m6 0l-3-3m3 3l-3 3" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Details bekijken
                          </Button>
                          <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-md transition-all">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="inline mr-1"><path d="M12 4v16m8-8H4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Account aanmaken
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Fade-in animatie keyframes */}
      <style>{`
        .animate-fade-in {
          animation: fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) both;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default withRoleGuard(AdminLeads, ["admin"]);
