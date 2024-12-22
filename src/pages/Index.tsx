import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SponsoredProduct } from "@/components/ads/SponsoredProduct";
import { ProductCard } from "@/components/vendor/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: promotions } = useQuery({
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
            price
          )
        `)
        .eq("status", "active")
        .eq("ad_format", "sponsored_product")
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  const { data: featuredProducts } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(6);

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Marketplace</h1>
      
      {/* Sponsored Products Section */}
      {promotions && promotions.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promotion) => (
              <SponsoredProduct 
                key={promotion.id} 
                promotion={{
                  id: promotion.id,
                  product: {
                    name: promotion.product.name,
                    description: promotion.product.description || "",
                    price: Number(promotion.product.price), // Explicitly convert price to number
                    images: []
                  },
                  ad_format: promotion.ad_format
                }} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Latest Products</h2>
          <Link to="/vendors">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts?.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                price: Number(product.price), // Explicitly convert price to number
                description: product.description || "",
                images: ["/placeholder.svg"],
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
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-primary/5 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Start Selling Today</h2>
        <p className="text-lg text-gray-600 mb-6">
          Join thousands of vendors and start growing your business
        </p>
        <Link to="/register">
          <Button size="lg">Become a Vendor</Button>
        </Link>
      </section>
    </div>
  );
};

export default Index;