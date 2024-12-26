import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(10);

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching products:', error);
    return [];
  }
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};