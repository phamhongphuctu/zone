// src/lib/api.ts
import { supabase } from "./supabaseClient";

export const postProductToSupabase = async (product: any) => {
  const { data, error } = await supabase
    .from("products")
    .insert([product]);

  if (error) throw error;
  return data;
};
