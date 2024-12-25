import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string | null;
}

export const useProducts = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["promoted-products"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_promoted", true)
          .limit(10);

        if (error) {
          console.error("Supabase error:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to fetch products. Please try again later.",
          });
          return [];
        }

        return data || [];
      } catch (err) {
        console.error("Query error:", err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
        });
        return [];
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
};