import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VideoProductCard } from "@/components/vendor/VideoProductCard";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Store, TrendingUp, Fire, Gift, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CURRENCY_RATES = {
  NGN: 460.0,
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.73,
};

type Currency = keyof typeof CURRENCY_RATES;

interface Product {
  id: string;
  name: string;
  price: number;
  description: string | null;
}

const featuredCategories = [
  { name: "Fashion", icon: <Star className="w-6 h-6" /> },
  { name: "Electronics", icon: <Fire className="w-6 h-6" /> },
  { name: "Beauty", icon: <Gift className="w-6 h-6" /> },
];

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [currency] = useState<Currency>("NGN");
  const { toast } = useToast();

  const { data: products, isLoading, error } = useQuery({
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
          console.error("Supabase error details:", error);
          throw error;
        }

        console.log("Products fetched:", data);
        return data || [];
      } catch (err) {
        console.error("Query error details:", err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch products. Please try again later.",
        });
        throw err;
      }
    },
    retry: 1,
    retryDelay: 1000,
  });

  if (error) {
    console.error("Query error:", error);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
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

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {[1, 2, 3].map((_, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[400px] rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20" />
                    <img
                      src={`/placeholder.svg`}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                      <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
                      <p className="text-lg text-white/80">Discover amazing deals from our vendors</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <div className="p-4 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors mb-4">
                  {category.icon}
                </div>
                <span className="text-lg font-medium">{category.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-white/90 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Trending Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <VideoProductCard
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      description: product.description || "",
                      videoUrl: "/sample-video.mp4",
                      thumbnailUrl: "/placeholder.svg",
                      stats: {
                        likes: 0,
                        shares: 0,
                      },
                      vendor: {
                        name: "Unknown Vendor",
                        avatar: "/placeholder.svg",
                        rewardPoints: 100,
                      },
                    }}
                    currency={currency}
                    currencyRate={CURRENCY_RATES[currency]}
                    onPurchase={() => {
                      setSelectedProduct(product);
                      setShowPurchaseDialog(true);
                    }}
                  />
                </motion.div>
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
          vendorName="Unknown Vendor"
        />
      )}
    </div>
  );
};

export default Index;