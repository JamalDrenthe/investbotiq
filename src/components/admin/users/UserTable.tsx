import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CircleDollarSign, Sparkles, UserCog, Mail, Edit3, Phone, Check } from "lucide-react";
import { UserType } from "./types";
import { firebaseStore } from "@/integrations/firebase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UserTableProps {
  users: UserType[];
}

export const UserTable = ({ users }: UserTableProps) => {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const openEditModal = (user: UserType) => {
    setEditingUser(user);
    const parts = user.name.split(" ");
    setEditFirstName(parts[0] || "");
    setEditLastName(parts.slice(1).join(" ") || "");
    setEditPhone("");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setIsSaving(true);
    try {
      const { error } = await firebaseStore
        .collection("profiles")
        .update({
          voornaam: editFirstName.trim() || null,
          achternaam: editLastName.trim() || null,
          telefoonnummer: editPhone.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingUser.id);

      if (error) throw error;
      toast.success("Gebruikersprofiel succesvol bijgewerkt");
      await queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      await queryClient.invalidateQueries({ queryKey: ["adminCashflowUsers"] });
      setEditingUser(null);
    } catch {
      toast.error("Fout bij bijwerken van gebruiker.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[280px]">Naam / Email / Rol</TableHead>
            <TableHead>Cashflow (€)</TableHead>
            <TableHead>Spirits</TableHead>
            <TableHead>BEL-lening (€)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Acties</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <p className="text-muted-foreground">Geen gebruikers gevonden</p>
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                      <Mail className="mr-1 h-3 w-3" />
                      {user.email}
                    </div>
                    <div className="flex items-center mt-1.5">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        user.role === "admin"
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800"
                          : "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300"
                      }`}>
                        Rol: {user.role === "admin" ? "Admin" : user.role === "member" ? "Member" : "Onbekend"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center font-mono font-medium">
                    <CircleDollarSign className="mr-1.5 h-4 w-4 text-emerald-500" />
                    €{user.cashflow.toLocaleString("nl-NL")}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center font-mono font-medium">
                    <Sparkles className="mr-1.5 h-4 w-4 text-purple-500" />
                    {user.spirits}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-mono font-medium">€{user.belLening.toLocaleString("nl-NL")}</span>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={user.status === "active" ? "default" : "outline"}
                    className={user.status === "active" ? "bg-emerald-600 hover:bg-emerald-600 text-white" : "bg-yellow-100 text-yellow-800"}
                  >
                    {user.status === "active" ? "Actief" : "In afwachting"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <button
                    type="button"
                    onClick={() => openEditModal(user)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-input px-2.5 py-1.5 text-xs font-semibold hover:bg-accent transition"
                    title="Bewerk profiel"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    Bewerk
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Edit User Modal */}
      <Dialog open={editingUser !== null} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className="max-w-md">
          <form onSubmit={handleSaveProfile}>
            <DialogHeader>
              <DialogTitle>Gebruikersprofiel Aanpassen</DialogTitle>
              <DialogDescription>
                Pas de contactgegevens aan voor {editingUser?.email}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                    Voornaam
                  </label>
                  <Input
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    placeholder="Voornaam"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                    Achternaam
                  </label>
                  <Input
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    placeholder="Achternaam"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                  Telefoonnummer
                </label>
                <Input
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="+31 6 ..."
                />
              </div>

              <div className="rounded-xl border border-border p-3 bg-muted/40 text-xs space-y-1">
                <p className="text-muted-foreground">Account-ID: <span className="font-mono text-foreground">{editingUser?.id}</span></p>
                <p className="text-muted-foreground">Huidige Cashflow: <span className="font-mono text-emerald-600 font-bold">€{editingUser?.cashflow}</span></p>
              </div>
            </div>

            <DialogFooter className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="rounded-xl border border-input px-4 py-2 text-xs font-semibold hover:bg-accent transition"
              >
                Annuleren
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition"
              >
                Opslaan
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
