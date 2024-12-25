import { useState } from "react";
import { VendorHeader } from "@/components/vendor/VendorHeader";
import { VideoProductCard } from "@/components/vendor/VideoProductCard";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currency, setCurrency] = useState("NGN");
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Mock data
  const categories = ["All", "Fashion", "Electronics", "Food", "Beauty", "Home"];
  const mockProducts = [
    {
      id: "1",
      name: "Trendy Summer Collection",
      price: 29999.99,
      description: "Exclusive summer wear for the fashion-forward generation!",
      videoUrl: "/sample-video.mp4",
      thumbnailUrl: "/placeholder.svg",
      stats: {
        likes: 1500,
        shares: 450
      },
      vendor: {
        name: "Fashion Hub",
        avatar: "/lovable-uploads/48779d7e-e936-4511-b4a2-cd75cb9332eb.png",
        rewardPoints: 2500
      },
      isSponsored: true,
      promotionId: "promo-123"
    },
    {
      id: "2",
      name: "Smart Watch Pro",
      price: 89999.99,
      description: "Next-gen smartwatch with health tracking features",
      videoUrl: "/sample-video.mp4",
      thumbnailUrl: "/placeholder.svg",
      stats: {
        likes: 2300,
        shares: 890
      },
      vendor: {
        name: "Tech Store",
        avatar: "/lovable-uploads/48779d7e-e936-4511-b4a2-cd75cb9332eb.png",
        rewardPoints: 3800
      }
    }
  ];

  const handlePurchase = (productId: string) => {
    setSelectedProduct(productId);
    setShowPurchaseDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <section className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4">
          <VendorHeader 
            vendorName="Vendors Connect"
            vendorDescription="Discover amazing products from verified vendors"
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            currency={currency}
            onCurrencyChange={setCurrency}
            onChatOpen={() => console.log("Chat opened")}
          />
        </div>
      </section>

      <section className="pt-32 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 snap-y snap-mandatory">
            {mockProducts.map((product) => (
              <VideoProductCard
                key={product.id}
                product={product}
                currency={currency}
                currencyRate={currency === "USD" ? 1 : 750}
                onPurchase={() => handlePurchase(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <CustomerDetailsDialog
        open={showPurchaseDialog}
        onOpenChange={setShowPurchaseDialog}
        productId={selectedProduct}
        vendorName={selectedProduct ? mockProducts.find(p => p.id === selectedProduct)?.vendor?.name : undefined}
      />
    </div>
  );
};

export default Index;