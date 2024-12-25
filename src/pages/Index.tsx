import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VideoProductCard } from "@/components/vendor/VideoProductCard";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Store, TrendingUp } from "lucide-react";

const CURRENCY_RATES = {
  NGN: 460.0,
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.73,
};

type Currency = keyof typeof CURRENCY_RATES;

interface Vendor {
  business_name: string;
  is_verified: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string | null;
  vendor_promotions: {
    id: string;
    ad_format: string | null;
    targeting_criteria: any;
  }[];
  vendors: Vendor[];  // Changed to array to match Supabase response
}

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [currency] = useState<Currency>("NGN");

  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          vendor_promotions (
            id,
            ad_format,
            targeting_criteria
          ),
          vendors (
            business_name,
            is_verified
          )
        `)
        .eq("is_promoted", true)
        .limit(10);

      if (error) throw error;
      return data as Product[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            Vendors Connect
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/register">
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                <Store className="w-4 h-4 mr-2" />
                Become a Vendor
              </Button>
            </Link>
            <Link to="/vendors">
              <Button className="bg-primary hover:bg-primary/90">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Video Feed */}
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Trending Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-white/90 mb-4">
              <TrendingUp className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Trending Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <VideoProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description || "",
                    videoUrl: "/sample-video.mp4", // Replace with actual video URL
                    thumbnailUrl: "/placeholder.svg", // Replace with actual thumbnail
                    stats: {
                      likes: 0,
                      shares: 0,
                    },
                    vendor: {
                      name: product.vendors[0]?.business_name || "Unknown Vendor", // Access first vendor from array
                      avatar: "/placeholder.svg", // Replace with actual avatar
                      rewardPoints: 100,
                    },
                    isSponsored: !!product.vendor_promotions?.length,
                    promotionId: product.vendor_promotions?.[0]?.id,
                  }}
                  currency={currency}
                  currencyRate={CURRENCY_RATES[currency]}
                  onPurchase={() => {
                    setSelectedProduct(product);
                    setShowPurchaseDialog(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {selectedProduct && (
        <CustomerDetailsDialog
          open={showPurchaseDialog}
          onOpenChange={setShowPurchaseDialog}
          productId={selectedProduct.id}
          amount={selectedProduct.price * CURRENCY_RATES[currency]}
          vendorName={selectedProduct.vendors[0]?.business_name || "Unknown Vendor"}
        />
      )}
    </div>
  );
};

export default Index;