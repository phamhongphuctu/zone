import { supabase } from "./supabaseClient";

// ✅ Hàm gửi sản phẩm lên Supabase
export const postProductToSupabase = async (product: any) => {
  const { error } = await supabase.from("products").insert([product]);
  if (error) throw error;
};

// ✅ Hàm lấy sản phẩm theo quốc gia
export const getProductsByCountry = async (country: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("country", country)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Lỗi lấy sản phẩm:", error);
    return [];
  }

  return data;
};
