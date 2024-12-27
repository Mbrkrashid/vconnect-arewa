import { motion } from "framer-motion";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Store, Home, Search, User } from "lucide-react";
import { useState } from "react";
import { useProducts, Product } from "@/hooks/useProducts";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { ProductGrid } from "@/components/products/ProductGrid";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  
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
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            TemuClone
          </h1>
          <div className="flex items-center gap-2">
            <Link to="/register">
              <Button size="sm" variant="ghost" className="text-white">
                <Store className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/vendors">
              <Button size="sm" variant="ghost" className="text-white">
                <ShoppingBag className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            <HeroSection />
            <CategoriesSection />

            {/* Featured Products */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Featured Products</h2>
                <Link to="/products">
                  <Button variant="outline">View All</Button>
                </Link>
              </div>
              <ProductGrid products={products || []} />
            </section>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around h-14">
            <Button variant="ghost" size="sm" className="text-white">
              <Home className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white">
              <ShoppingBag className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {selectedProduct && (
        <CustomerDetailsDialog
          open={showPurchaseDialog}
          onOpenChange={setShowPurchaseDialog}
          productId={selectedProduct.id}
          amount={selectedProduct.price}
          vendorName={selectedProduct.vendor?.business_name || "Unknown Vendor"}
        />
      )}
    </div>
  );
};

export default Index;