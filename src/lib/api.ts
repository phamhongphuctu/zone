import { supabase } from "./supabaseClient";

// ✅ Hàm gửi sản phẩm lên Supabase
export const postProductToSupabase = async (product: any) => {
  const { error } = await supabase.from("products").insert([product]);
  if (error) {
    console.error("❌ Lỗi khi gửi sản phẩm:", error.message);
    throw error;
  }
};

// ✅ Hàm lấy sản phẩm theo quốc gia
export const getProductsByCountry = async (country: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("country", country.toLowerCase()) // ép về chữ thường
    .order("id", { ascending: false });   // sắp theo id nếu chưa có created_at

  if (error) {
    console.error("❌ Lỗi lấy sản phẩm:", error.message);
    return [];
  }

  if (!data || data.length === 0) {
    console.log("✅ Không có sản phẩm cho quốc gia:", country);
    return [];
  }

  return data;
};
