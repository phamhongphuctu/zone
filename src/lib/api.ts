import { supabase } from "./supabaseClient";

export async function postProductToSupabase(product: any) {
  const { error } = await supabase.from("products").insert([product]);
  if (error) {
    console.error("Lỗi khi gửi sản phẩm:", error.message);
    throw error;
  }
}
