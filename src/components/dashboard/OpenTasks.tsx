
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { firebaseStore } from "@/integrations/firebase/client";
import { type Task } from "@/types/task";
import { useAuth } from "@/components/AuthProvider";

const OpenTasks = () => {
  const { user, userRole } = useAuth();
  // Fetch the open tasks count
  const { data: openTasksCount = 0 } = useQuery({
    queryKey: ["openTasksCount", user?.id, userRole],
    queryFn: async () => {
      if (!user) return 0;
      let query = firebaseStore
        .collection("tasks")
        .select("*", { count: 'exact', head: true })
        .eq("status", "open");
      if (userRole !== "admin") query = query.eq("user_id", user.id);
      const { count, error } = await query;

      if (error) throw error;
      return count || 0;
    },
    enabled: !!user,
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Open Taken</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <CheckSquare className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-2xl font-bold">{openTasksCount}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenTasks;
