import { supabase } from "./supabaseClient";

export async function uploadImage(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase
    .storage
    .from("product-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data: publicUrlData } = supabase
    .storage
    .from("product-images")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
