import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SponsoredProduct } from "@/components/ads/SponsoredProduct";
import { ProductCard } from "@/components/vendor/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: promotions, isLoading: isLoadingPromotions } = useQuery({
    queryKey: ["sponsored-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendor_promotions")
        .select(`
          id,
          ad_format,
          product:products (
            id,
            name,
            description,
            price,
            images
          )
        `)
        .eq("status", "active")
        .eq("ad_format", "sponsored_product")
        .limit(3);

      if (error) {
        console.error("Error fetching promotions:", error);
        throw error;
      }
      return data;
    },
  });

  const { data: featuredProducts, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(6);

      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Welcome to Our Marketplace
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing products from verified vendors
        </p>
      </section>
      
      {/* Sponsored Products Section */}
      {(isLoadingPromotions || promotions?.length > 0) && (
        <section className="container mx-auto px-4 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-semibold">Featured Products</h2>
            <Badge variant="secondary" className="text-sm">Sponsored</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingPromotions ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-[300px] rounded-xl" />
              ))
            ) : (
              promotions?.map((promotion) => (
                <SponsoredProduct 
                  key={promotion.id} 
                  promotion={{
                    id: promotion.id,
                    product: {
                      name: promotion.product.name,
                      description: promotion.product.description || "",
                      price: Number(promotion.product.price || 0),
                      images: promotion.product.images || []
                    },
                    ad_format: promotion.ad_format
                  }} 
                />
              ))
            )}
          </div>
        </section>
      )}

      {/* Latest Products */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Latest Products</h2>
          <Link to="/vendors">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoadingProducts ? (
            Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl" />
            ))
          ) : (
            featuredProducts?.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: Number(product.id),
                  name: product.name,
                  price: Number(product.price || 0),
                  description: product.description || "",
                  images: product.images || ["/placeholder.svg"],
                  category: product.category || "General",
                  discount: 0,
                  deliveryOptions: ["Standard Delivery"],
                  rewardPoints: 0,
                  stats: {
                    views: 0,
                    likes: 0,
                    shares: 0,
                    saves: 0,
                  },
                }}
                currency="USD"
                currencyRate={1}
                onPurchase={() => {}}
              />
            ))
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Selling Today</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of vendors and start growing your business with our powerful marketplace platform
          </p>
          <Link to="/register">
            <Button size="lg" className="px-8">
              Become a Vendor
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;