import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ChatDialog } from "@/components/ChatDialog";
import { VendorHeader } from "@/components/vendor/VendorHeader";
import { VendorStats } from "@/components/vendor/VendorStats";
import { VideoProductCard } from "@/components/vendor/VideoProductCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const CURRENCY_RATES = {
  USD: 1,
  NGN: 1200,
  EUR: 0.92,
  GBP: 0.79,
};

type Currency = keyof typeof CURRENCY_RATES;

// Enhanced mock data with video URLs
const mockVendorDetails = {
  id: 1,
  name: "Fashion Hub",
  description: "Quality clothing and accessories",
  joinedDate: "2024-01-15",
  stats: {
    totalSales: 1250,
    totalRevenue: 25000,
    averageRating: 4.5,
    totalProducts: 15,
    viewsLastMonth: 3000,
    engagementRate: "12%"
  },
  products: [
    {
      id: 1,
      name: "Summer Collection 2024",
      price: 59.99,
      description: "Exclusive summer wear for the season",
      videoUrl: "https://example.com/video1.mp4",
      thumbnailUrl: "/placeholder.svg",
      category: "Clothing",
      stats: {
        likes: 45,
        shares: 12
      }
    },
    {
      id: 2,
      name: "Designer Handbag",
      price: 89.99,
      description: "Premium leather handbag",
      videoUrl: "https://example.com/video2.mp4",
      thumbnailUrl: "/placeholder.svg",
      category: "Accessories",
      stats: {
        likes: 35,
        shares: 8
      }
    },
  ],
  categories: ["All", "Clothing", "Accessories"],
};

const VendorDetails = () => {
  const { id } = useParams();
  const [currency, setCurrency] = useState<Currency>("USD");
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: vendor, isLoading } = useQuery({
    queryKey: ["vendor", id],
    queryFn: () => mockVendorDetails,
  });

  const filteredProducts = vendor?.products.filter(
    (product) => selectedCategory === "All" || product.category === selectedCategory
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto py-8">
        <VendorHeader
          vendorName={vendor?.name || ""}
          vendorDescription={vendor?.description || ""}
          categories={vendor?.categories || []}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          currency={currency}
          onCurrencyChange={(value: string) => setCurrency(value as Currency)}
          onChatOpen={() => setChatOpen(true)}
        />

        {vendor && (
          <VendorStats stats={vendor.stats} joinedDate={vendor.joinedDate} />
        )}

        <ScrollArea className="h-[calc(100vh-300px)] mt-8">
          <div className="flex flex-col gap-4 snap-y snap-mandatory">
            {filteredProducts?.map((product) => (
              <VideoProductCard
                key={product.id}
                product={product}
                currency={currency}
                currencyRate={CURRENCY_RATES[currency]}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <ChatDialog
        vendorName={vendor?.name || "Vendor"}
        open={chatOpen}
        onOpenChange={setChatOpen}
      />
    </div>
  );
};

export default VendorDetails;