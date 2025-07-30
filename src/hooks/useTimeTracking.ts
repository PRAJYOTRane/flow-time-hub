import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

// Type aliases for better readability
export type TimeEntry = Tables<"time_entries">;
export type TimeEntryInsert = TablesInsert<"time_entries">;
export type TimeEntryUpdate = TablesUpdate<"time_entries">;

// Time tracking hooks
export const useTimeEntries = (taskId?: string, userId?: string) => {
  return useQuery({
    queryKey: ["time_entries", taskId, userId],
    queryFn: async () => {
      let query = supabase
        .from("time_entries")
        .select(`
          *,
          task:tasks (
            id,
            title,
            project:projects (
              id,
              name
            )
          ),
          user:profiles (
            id,
            full_name,
            email
          )
        `)
        .order("start_time", { ascending: false });

      if (taskId) {
        query = query.eq("task_id", taskId);
      }
      
      if (userId) {
        query = query.eq("user_id", userId);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
};

export const useRunningTimeEntry = (userId: string) => {
  return useQuery({
    queryKey: ["running_time_entry", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("time_entries")
        .select(`
          *,
          task:tasks (
            id,
            title,
            project:projects (
              id,
              name
            )
          )
        `)
        .eq("user_id", userId)
        .eq("is_running", true)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });
};

export const useStartTimeEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ taskId, userId, description }: { taskId: string; userId: string; description?: string }) => {
      // First, stop any running time entries
      const { data: runningEntries } = await supabase
        .from("time_entries")
        .select("id, start_time")
        .eq("user_id", userId)
        .eq("is_running", true);

      if (runningEntries && runningEntries.length > 0) {
        const endTime = new Date().toISOString();
        for (const entry of runningEntries) {
          const startTime = new Date(entry.start_time);
          const durationSeconds = Math.floor((new Date(endTime).getTime() - startTime.getTime()) / 1000);
          
          await supabase
            .from("time_entries")
            .update({ 
              is_running: false,
              end_time: endTime,
              duration_seconds: durationSeconds
            })
            .eq("id", entry.id);
        }
      }

      // Then start new time entry
      const { data, error } = await supabase
        .from("time_entries")
        .insert({
          task_id: taskId,
          user_id: userId,
          description,
          start_time: new Date().toISOString(),
          is_running: true,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["time_entries"] });
      queryClient.invalidateQueries({ queryKey: ["running_time_entry", variables.userId] });
    },
  });
};

export const useStopTimeEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      const endTime = new Date().toISOString();
      
      // Get the start time to calculate duration
      const { data: timeEntry } = await supabase
        .from("time_entries")
        .select("start_time")
        .eq("id", id)
        .single();

      if (!timeEntry) throw new Error("Time entry not found");

      const startTime = new Date(timeEntry.start_time);
      const durationSeconds = Math.floor((new Date(endTime).getTime() - startTime.getTime()) / 1000);

      const { data, error } = await supabase
        .from("time_entries")
        .update({
          end_time: endTime,
          duration_seconds: durationSeconds,
          is_running: false,
        })
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["time_entries"] });
      queryClient.invalidateQueries({ queryKey: ["running_time_entry", variables.userId] });
    },
  });
};
