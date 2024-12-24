import { useState } from "react";
import { VendorHeader } from "@/components/vendor/VendorHeader";
import { VideoProductCard } from "@/components/vendor/VideoProductCard";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currency, setCurrency] = useState("USD");

  // Mock data
  const categories = ["All", "Fashion", "Electronics", "Food"];
  const mockProduct = {
    id: 1,
    name: "Amazing Product",
    price: 99.99,
    description: "Check out this incredible item!",
    videoUrl: "/sample-video.mp4",
    thumbnailUrl: "/placeholder.svg",
    stats: {
      likes: 500,
      shares: 200
    },
    vendor: {
      name: "Fashion Store",
      avatar: "/lovable-uploads/48779d7e-e936-4511-b4a2-cd75cb9332eb.png",
      rewardPoints: 1500
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <VendorHeader 
            vendorName="Welcome to Vendors Connect"
            vendorDescription="Join our marketplace and start selling your products with a 15% commission on sales"
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            currency={currency}
            onCurrencyChange={setCurrency}
            onChatOpen={() => console.log("Chat opened")}
          />
        </div>
      </section>

      {/* Video Feed Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Trending Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <VideoProductCard
              product={mockProduct}
              currency={currency}
              currencyRate={currency === "USD" ? 1 : 750} // Example rate for NGN
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;