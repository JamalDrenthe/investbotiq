
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { firebaseStore } from "@/integrations/firebase/client";
import { Check, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { type Task } from "@/types/task";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthProvider";

const TaskList = () => {
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  
  const { data: recentTasks = [], isLoading } = useQuery({
    queryKey: ["recentTasks", user?.id, userRole],
    queryFn: async () => {
      if (!user) return [];
      let query = firebaseStore
        .collection("tasks")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false })
        .limit(3);
      if (userRole !== "admin") query = query.eq("user_id", user.id);
      const { data, error } = await query;

      if (error) throw error;

      return data as Task[];
    },
    enabled: !!user,
  });

  // Get status icon based on task priority or deadline
  const getStatusIcon = (task: Task) => {
    // This is a placeholder logic - adjust based on your actual task model
    const priority = task.priority || "normal";
    
    switch(priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "normal":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <Check className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Recente Taken</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col space-y-2 animate-pulse">
            <div className="h-12 bg-muted rounded-md"></div>
            <div className="h-12 bg-muted rounded-md"></div>
            <div className="h-12 bg-muted rounded-md"></div>
          </div>
        ) : recentTasks.length > 0 ? (
          <>
            {recentTasks.map(task => (
              <div 
                key={task.id} 
                className="flex items-start space-x-3 p-2 rounded-md hover:bg-accent transition-colors cursor-pointer group"
                onClick={() => navigate(`/member/tasks/${task.id}`)}
              >
                <div className="mt-0.5">
                  {getStatusIcon(task)}
                </div>
                <div className="text-sm">
                  <p className={cn(
                    "font-medium group-hover:text-primary transition-colors",
                    task.priority === "high" ? "text-red-600" : ""
                  )}>
                    {task.taak_omschrijving}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {task.deadline ? new Date(task.deadline).toLocaleDateString() : "Geen deadline"}
                  </p>
                </div>
              </div>
            ))}
            <Button 
              variant="ghost" 
              className="w-full text-xs mt-2 hover:bg-primary/10" 
              onClick={() => navigate("/member/tasks")}
            >
              Bekijk alle taken
            </Button>
          </>
        ) : (
          <div className="text-center py-8 space-y-2">
            <p className="text-muted-foreground">Geen openstaande taken</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/member/tasks")}
            >
              Ga naar Taken
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
