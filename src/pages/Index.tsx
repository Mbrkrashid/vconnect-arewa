import { VendorHeader } from "@/components/vendor/VendorHeader";
import { VideoProductCard } from "@/components/vendor/VideoProductCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <VendorHeader 
            title="Welcome to Vendors Connect" 
            description="Join our marketplace and start selling your products with a 15% commission on sales"
          />
        </div>
      </section>

      {/* Video Feed Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Trending Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example video cards - replace with real data */}
            <VideoProductCard
              title="Amazing Product"
              description="Check out this incredible item!"
              videoUrl="/sample-video.mp4"
              viewCount={1000}
              likeCount={500}
              shareCount={200}
            />
            {/* Add more VideoProductCard components as needed */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;