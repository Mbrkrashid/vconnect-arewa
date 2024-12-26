import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_promoted', true)
    .limit(10);

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data || [];
};

export const useProducts = () => {
  return {
    queryKey: ['products'],
    queryFn: fetchProducts,
  };
};