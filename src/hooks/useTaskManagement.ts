
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { firebaseStore } from "@/integrations/firebase/client";
import { type Task } from "@/types/task";
import { useAuth } from "@/components/AuthProvider";

export const useTaskManagement = () => {
  const { user, userRole } = useAuth();
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks", user?.id, userRole],
    queryFn: async () => {
      if (!user) return [];
      let query = firebaseStore.collection("tasks").select("*").order("created_at", { ascending: false });
      if (userRole !== "admin") query = query.eq("user_id", user.id);
      const { data, error } = await query;

      if (error) throw error;

      return data as Task[];
    },
    enabled: !!user,
  });

  const handleStatusChange = async (taskId: string) => {
    if (!user) return;
    let query = firebaseStore
      .collection("tasks")
      .update({ status: "completed" })
      .eq("id", taskId);
    if (userRole !== "admin") query = query.eq("user_id", user.id);
    const { error } = await query;

    if (error) {
      toast.error("Er is een fout opgetreden bij het bijwerken van de taak");
      return;
    }

    toast.success("Taakstatus bijgewerkt");
  };

  const handleUpload = (taskId: string) => {
    toast.info("Uploadfunctionaliteit komt binnenkort beschikbaar");
  };

  return {
    tasks,
    isLoading,
    handleStatusChange,
    handleUpload
  };
};
