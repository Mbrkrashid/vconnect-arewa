import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string | null;
}

export const useProducts = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      try {
        console.log("Fetching products...");
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_promoted", true)
          .limit(10)
          .throwOnError();

        if (error) {
          console.error("Supabase error:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch products. Please try again later.",
          });
          throw error;
        }

        return data || [];
      } catch (err) {
        console.error("Query error:", err);
        throw err;
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};