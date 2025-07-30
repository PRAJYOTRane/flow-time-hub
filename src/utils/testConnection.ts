// Quick database connection test
import { supabase } from "@/integrations/supabase/client";

export const testDatabaseConnection = async () => {
  try {
    console.log("Testing database connection...");
    
    // Test basic connection
    const { data, error } = await supabase
      .from("projects")
      .select("count", { count: "exact" });
    
    if (error) {
      console.error("Database connection failed:", error);
      return { success: false, error: error.message };
    }
    
    console.log("Database connected successfully!");
    console.log("Projects table exists with", data, "records");
    return { success: true, count: data };
    
  } catch (error) {
    console.error("Connection test failed:", error);
    return { success: false, error: error.message };
  }
};
