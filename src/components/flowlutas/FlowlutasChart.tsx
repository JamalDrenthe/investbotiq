
import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const FlowlutasChart = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: flowlutasData } = useQuery({
    queryKey: ["flowlutas-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("flowlutas")
        .select("tier, monthly_cashflow, created_at")
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data.map(item => ({
        date: new Date(item.created_at).toLocaleDateString(),
        cashflow: item.monthly_cashflow,
        tier: item.tier
      }));
    },
  });

  return (
    <div className="h-[300px] w-full mt-4 card-glass p-4">
      {mounted && (
        <ResponsiveContainer width="100%" height="100%" debounce={50}>
          <LineChart data={flowlutasData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="cashflow" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
