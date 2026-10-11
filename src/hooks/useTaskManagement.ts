import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { firebaseStore } from "@/integrations/firebase/client";
import { type Task } from "@/types/task";
import { useAuth } from "@/components/AuthProvider";

export const useTaskManagement = () => {
  const queryClient = useQueryClient();
  const { user, userRole } = useAuth();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks", user?.id, userRole],
    queryFn: async () => {
      if (!user) return [];
      let query = firebaseStore.collection("tasks").select("*").order("created_at", { ascending: false });
      if (userRole !== "admin") query = query.eq("user_id", user.id);
      const { data, error } = await query;

      if (error) throw error;

      return (data as Record<string, unknown>[]).map((item) => ({
        ...item,
        taak_omschrijving: (item.taak_omschrijving || item.title || item.description || "Taak") as string,
      })) as Task[];
    },
    enabled: !!user,
  });

  const handleStatusChange = async (taskId: string) => {
    if (!user) return;
    const currentTask = tasks.find((t) => t.id === taskId);
    const newStatus = currentTask?.status === "completed" ? "open" : "completed";

    let query = firebaseStore
      .collection("tasks")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", taskId);
    if (userRole !== "admin") query = query.eq("user_id", user.id);
    const { error } = await query;

    if (error) {
      toast.error("Er is een fout opgetreden bij het bijwerken van de taak");
      return;
    }

    toast.success(`Taak gemarkeerd als ${newStatus === "completed" ? "voltooid" : "open"}`);
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const createTask = async (payload: {
    user_id: string;
    taak_omschrijving: string;
    priority?: "high" | "medium" | "low";
    type?: "contract" | "document" | "report";
    deadline?: string;
  }): Promise<boolean> => {
    if (!user) return false;
    const { error } = await firebaseStore.collection("tasks").insert({
      id: crypto.randomUUID(),
      user_id: payload.user_id,
      taak_omschrijving: payload.taak_omschrijving,
      priority: payload.priority || "medium",
      type: payload.type || "document",
      deadline: payload.deadline || null,
      status: "open",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      toast.error("Kon de taak niet aanmaken");
      return false;
    }

    toast.success("Taak succesvol aangemaakt");
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    return true;
  };

  const deleteTask = async (taskId: string): Promise<boolean> => {
    if (!user) return false;
    const { error } = await firebaseStore.collection("tasks").delete().eq("id", taskId);

    if (error) {
      toast.error("Kon de taak niet verwijderen");
      return false;
    }

    toast.success("Taak verwijderd");
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    return true;
  };

  const handleUpload = (_taskId: string) => {
    toast.info("Uploadfunctionaliteit komt binnenkort beschikbaar");
  };

  return {
    tasks,
    isLoading,
    handleStatusChange,
    createTask,
    deleteTask,
    handleUpload,
  };
};
