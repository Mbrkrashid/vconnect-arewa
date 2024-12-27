import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string;
  vendor_id: string;
  images: string[];
  rating: number;
  reviews_count: number;
  category: {
    name: string;
    slug: string;
  };
  vendor: {
    business_name: string;
  };
}

export const fetchProducts = async (): Promise<Product[]> => {
  console.log('Fetching products...');
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, 
      name, 
      description, 
      price,
      images,
      rating,
      reviews_count,
      category_id,
      vendor_id,
      category:categories(name, slug),
      vendor:vendors(business_name)
    `)
    .limit(20);

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  console.log('Products fetched:', data);
  return data || [];
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};