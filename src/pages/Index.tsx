import { motion } from "framer-motion";
import { VideoProductCard } from "@/components/vendor/VideoProductCard";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Store, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useProducts, Product } from "@/hooks/useProducts";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";

const CURRENCY_RATES = {
  NGN: 460.0,
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.73,
};

type Currency = keyof typeof CURRENCY_RATES;

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [currency] = useState<Currency>("NGN");
  
  const { data: products, isLoading, error } = useProducts();

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

      <HeroSection />
      <CategoriesSection />

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