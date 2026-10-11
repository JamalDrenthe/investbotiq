import { useState } from "react";
import { withRoleGuard } from "@/utils/withRoleGuard";
import { AdminNavBar } from "@/components/admin/AdminNavBar";
import Header from "@/components/Header";
import { useTaskManagement } from "@/hooks/useTaskManagement";
import { useQuery } from "@tanstack/react-query";
import { firebaseStore } from "@/integrations/firebase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ListTodo,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  Search,
  User,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/types/data-model";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const AdminTasks = () => {
  const { tasks, isLoading, handleStatusChange, createTask, deleteTask } = useTaskManagement();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New task form state
  const [assignedUserId, setAssignedUserId] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [taskType, setTaskType] = useState<"contract" | "document" | "report">("document");
  const [deadline, setDeadline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch available users to assign tasks to
  const { data: users = [] } = useQuery({
    queryKey: ["adminProfilesList"],
    queryFn: async () => {
      const { data, error } = await firebaseStore.collection("profiles").select("*");
      if (error) throw error;
      return data as Profile[];
    },
  });

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskDescription.trim()) {
      toast.error("Vul een taakomschrijving in.");
      return;
    }
    if (!assignedUserId) {
      toast.error("Selecteer een gebruiker.");
      return;
    }

    setIsSubmitting(true);
    const success = await createTask({
      user_id: assignedUserId,
      taak_omschrijving: taskDescription.trim(),
      priority,
      type: taskType,
      deadline: deadline || undefined,
    });
    setIsSubmitting(false);

    if (success) {
      setIsCreateOpen(false);
      setTaskDescription("");
      setDeadline("");
    }
  };

  const getUserName = (userId: string) => {
    const profile = users.find((u) => u.id === userId);
    if (!profile) return userId ? userId.slice(0, 8) : "Onbekend";
    const name = [profile.voornaam, profile.achternaam].filter(Boolean).join(" ");
    return name || profile.email || userId.slice(0, 8);
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
    const searchLower = searchTerm.toLowerCase();
    const userName = getUserName(t.user_id).toLowerCase();
    const matchesSearch =
      !searchTerm ||
      t.taak_omschrijving.toLowerCase().includes(searchLower) ||
      userName.includes(searchLower);
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const countTotal = tasks.length;
  const countOpen = tasks.filter((t) => t.status === "open").length;
  const countCompleted = tasks.filter((t) => t.status === "completed").length;
  const countHighPriority = tasks.filter((t) => t.priority === "high" && t.status !== "completed").length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 md:px-6 py-6">
        <AdminNavBar />

        {/* Header Title & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Takenbeheer</h2>
            <p className="text-muted-foreground text-sm">
              Beheer, creëer en wijs taken toe aan platformleden en investeerders.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
          >
            <Plus className="h-4 w-4" />
            Nieuwe Taak Toevoegen
          </button>
        </div>

        {/* Task Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Totaal Taken</span>
              <ListTodo className="h-4 w-4 text-indigo-500" />
            </div>
            <p className="text-2xl font-bold">{countTotal}</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Openstaand</span>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-amber-500">{countOpen}</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Voltooid</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-emerald-500">{countCompleted}</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Hoge Prioriteit</span>
              <AlertCircle className="h-4 w-4 text-rose-500" />
            </div>
            <p className="text-2xl font-bold text-rose-500">{countHighPriority}</p>
          </Card>
        </div>

        {/* Filter Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Zoek taak of gebruiker..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Statussen</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="completed">Voltooid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Prioriteit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Prioriteiten</SelectItem>
                  <SelectItem value="high">Hoog</SelectItem>
                  <SelectItem value="medium">Gemiddeld</SelectItem>
                  <SelectItem value="low">Laag</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Takenoverzicht ({filteredTasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12 text-sm text-indigo-500 animate-pulse">Taken laden…</div>
            ) : filteredTasks.length === 0 ? (
              <p className="text-center text-muted-foreground py-10 text-sm">
                Geen taken gevonden die voldoen aan de filters.
              </p>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-indigo-300 dark:hover:border-indigo-700 transition"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(task.id)}
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                          task.status === "completed"
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-input hover:border-indigo-500"
                        }`}
                        title={task.status === "completed" ? "Markeer als open" : "Markeer als voltooid"}
                      >
                        {task.status === "completed" && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </button>

                      <div className="space-y-1 min-w-0">
                        <p
                          className={`text-sm font-semibold truncate ${
                            task.status === "completed" ? "line-through text-muted-foreground" : ""
                          }`}
                        >
                          {task.taak_omschrijving}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 text-foreground font-medium">
                            <User className="h-3 w-3 text-indigo-500" />
                            {getUserName(task.user_id)}
                          </span>
                          <span className="capitalize">Type: {task.type}</span>
                          {task.deadline && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Deadline: {new Date(task.deadline).toLocaleDateString("nl-NL")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Badge
                        variant="outline"
                        className={`capitalize text-xs ${
                          task.priority === "high"
                            ? "border-rose-300 text-rose-600 bg-rose-50 dark:bg-rose-950/40"
                            : task.priority === "medium"
                            ? "border-amber-300 text-amber-600 bg-amber-50 dark:bg-amber-950/40"
                            : "border-slate-300 text-slate-600"
                        }`}
                      >
                        {task.priority === "high" ? "Hoog" : task.priority === "medium" ? "Gemiddeld" : "Laag"}
                      </Badge>

                      <Badge
                        variant={task.status === "completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {task.status === "completed" ? "Voltooid" : "Open"}
                      </Badge>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm("Taak verwijderen?")) {
                            deleteTask(task.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                        title="Verwijder taak"
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

        {/* Create Task Modal */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent className="max-w-md">
            <form onSubmit={handleCreateSubmit}>
              <DialogHeader>
                <DialogTitle>Nieuwe Taak Toewijzen</DialogTitle>
                <DialogDescription>
                  Maak een taak aan voor een specifiek platformlid.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4 text-sm">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                    Toewijzen aan gebruiker
                  </label>
                  <Select value={assignedUserId} onValueChange={setAssignedUserId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kies een gebruiker" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((u) => (
                        <SelectItem key={u.id} value={u.id}>
                          {[u.voornaam, u.achternaam].filter(Boolean).join(" ") || u.email || u.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                    Taakomschrijving
                  </label>
                  <Input
                    placeholder="Bijv. Documentatie controleren of KYC afronden"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                      Prioriteit
                    </label>
                    <Select value={priority} onValueChange={(val) => setPriority(val as "high" | "medium" | "low")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Laag</SelectItem>
                        <SelectItem value="medium">Gemiddeld</SelectItem>
                        <SelectItem value="high">Hoog</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                      Type
                    </label>
                    <Select value={taskType} onValueChange={(val) => setTaskType(val as "contract" | "document" | "report")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="report">Rapportage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                    Deadline (optioneel)
                  </label>
                  <Input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="rounded-xl border border-input px-4 py-2 text-xs font-semibold hover:bg-accent transition"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition"
                >
                  Taak Opslaan
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default withRoleGuard(AdminTasks, ["admin"]);
