// src/lib/uploadImage.ts
import { supabase } from "./supabaseClient";

export async function uploadImage(file: File): Promise<string | null> {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file);

  if (error) {
    console.error("Lỗi khi upload ảnh:", error);
    return null;
  }

  const url = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName).data.publicUrl;

  return url;
}
