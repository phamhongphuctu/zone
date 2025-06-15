import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mtzqjakriqxgahjhbewl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10enFqYWtyaXF4Z2FoamhiZXdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDA3ODYsImV4cCI6MjA2NTU3Njc4Nn0.lxHbGJrNdU76S9clPI7xyHcLb6_WhrrItJquBgVeeDc";

export const supabase = createClient(supabaseUrl, supabaseKey);
