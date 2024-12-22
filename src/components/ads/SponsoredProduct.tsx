import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface SponsoredProductProps {
  promotion: {
    id: string;
    product: {
      name: string;
      description: string;
      price: number;
      images?: string[];
    };
    ad_format: string;
  };
}

export const SponsoredProduct = ({ promotion }: SponsoredProductProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const logImpression = async () => {
      try {
        const { error } = await supabase
          .from("ad_impressions")
          .insert({
            promotion_id: promotion.id,
            impression_type: "view",
            device_info: {
              userAgent: navigator.userAgent,
              platform: navigator.platform,
            },
          });

        if (error) throw error;
      } catch (error) {
        console.error("Error logging impression:", error);
      }
    };

    logImpression();
  }, [promotion.id]);

  const handleClick = async () => {
    try {
      const { error } = await supabase
        .from("ad_impressions")
        .insert({
          promotion_id: promotion.id,
          impression_type: "click",
          device_info: {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
          },
        });

      if (error) throw error;

      toast({
        title: "Sponsored Product",
        description: "You clicked on a sponsored product!",
      });
    } catch (error) {
      console.error("Error logging click:", error);
    }
  };

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <Badge variant="secondary" className="absolute top-2 right-2">
          Sponsored
        </Badge>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{promotion.product.name}</h3>
          <p className="text-sm text-gray-600">{promotion.product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">
              ${promotion.product.price.toFixed(2)}
            </span>
            <Button onClick={handleClick}>Learn More</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};