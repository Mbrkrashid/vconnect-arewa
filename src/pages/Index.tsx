import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { VideoProductCard } from "@/components/vendor/VideoProductCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { data: videos, isLoading } = useQuery({
    queryKey: ["featured-videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("video_content")
        .select(`
          *,
          vendors:vendor_id (
            business_name,
            description
          )
        `)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  // Mock data for development
  const mockProducts = [
    {
      id: 1,
      name: "Summer Collection 2024",
      price: 59.99,
      description: "Exclusive summer wear for the season",
      videoUrl: "https://example.com/video1.mp4",
      thumbnailUrl: "/placeholder.svg",
      stats: {
        likes: 45,
        shares: 12,
      },
    },
    {
      id: 2,
      name: "Designer Handbag",
      price: 89.99,
      description: "Premium leather handbag",
      videoUrl: "https://example.com/video2.mp4",
      thumbnailUrl: "/placeholder.svg",
      stats: {
        likes: 35,
        shares: 8,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section - Show only when no videos are playing */}
      <section className="relative pt-24 pb-16 px-4 md:pt-32 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Connect with Local Vendors in Northern Nigeria
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover and connect with trusted local vendors in Northern Nigeria. From traditional crafts to modern services, find everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/vendors">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Vendors
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Become a Vendor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Feed Section */}
      <section className="max-w-3xl mx-auto py-8">
        <div className="flex flex-col gap-4 snap-y snap-mandatory">
          {isLoading ? (
            <div className="text-white text-center">Loading videos...</div>
          ) : videos && videos.length > 0 ? (
            videos.map((video) => (
              <VideoProductCard
                key={video.id}
                product={{
                  id: video.id,
                  name: video.title,
                  price: 0, // Add price to video_content or fetch from products table
                  description: video.description || "",
                  videoUrl: video.video_url,
                  thumbnailUrl: video.thumbnail_url || "/placeholder.svg",
                  stats: {
                    likes: video.likes_count,
                    shares: video.shares_count,
                  },
                }}
                currency="NGN"
                currencyRate={1200}
              />
            ))
          ) : (
            // Show mock data for development
            mockProducts.map((product) => (
              <VideoProductCard
                key={product.id}
                product={product}
                currency="NGN"
                currencyRate={1200}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;