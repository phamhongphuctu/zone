// src/lib/uploadImage.ts
import { supabase } from "./supabaseClient";

export async function uploadImage(file: File): Promise<string | null> {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("❌ Upload failed:", error);
    return null;
  }

  // Lấy public URL
  const { data: publicUrlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  return publicUrlData?.publicUrl || null;
}
