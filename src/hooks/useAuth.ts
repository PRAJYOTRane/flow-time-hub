import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Tables } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles">;

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
};

export const useProfile = (userId?: string) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      
      if (error && error.code !== "PGRST116") {
        throw error;
      }
      
      return data;
    },
    enabled: !!userId,
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: async ({ email, password, fullName }: { email: string; password: string; fullName: string }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, updates }: { userId: string; updates: Partial<Profile> }) => {
      const { data, error } = await supabase
        .from("profiles")
        .upsert({ id: userId, ...updates })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["profile", variables.userId] });
    },
  });
};
