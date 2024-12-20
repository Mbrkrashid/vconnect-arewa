import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ChatDialog } from "@/components/ChatDialog";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";
import { ProductCard } from "@/components/vendor/ProductCard";
import { VendorHeader } from "@/components/vendor/VendorHeader";
import { VendorStats } from "@/components/vendor/VendorStats";

// Currency conversion rates (in production, these would come from an API)
const CURRENCY_RATES = {
  USD: 1,
  NGN: 1200,
  EUR: 0.92,
  GBP: 0.79,
};

type Currency = keyof typeof CURRENCY_RATES;

// Enhanced mock data with analytics
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
      name: "Summer Dress",
      price: 59.99,
      description: "Beautiful floral summer dress",
      images: ["/placeholder.svg"],
      videoUrl: "https://example.com/video1.mp4",
      category: "Clothing",
      discount: 10,
      deliveryOptions: ["Standard", "Express"],
      rewardPoints: 50,
      stats: {
        views: 1200,
        likes: 45,
        shares: 12,
        saves: 30
      }
    },
    {
      id: 2,
      name: "Leather Bag",
      price: 89.99,
      description: "Handcrafted leather shoulder bag",
      images: ["/placeholder.svg"],
      videoUrl: "https://example.com/video2.mp4",
      category: "Accessories",
      discount: 0,
      deliveryOptions: ["Standard"],
      rewardPoints: 75,
      stats: {
        views: 800,
        likes: 35,
        shares: 8,
        saves: 20
      }
    },
  ],
  categories: ["All", "Clothing", "Accessories"],
};

const VendorDetails = () => {
  const { id } = useParams();
  const [currency, setCurrency] = useState<Currency>("USD");
  const [chatOpen, setChatOpen] = useState(false);
  const [customerDetailsOpen, setCustomerDetailsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

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

      {vendor && <VendorStats stats={vendor.stats} joinedDate={vendor.joinedDate} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredProducts?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currency={currency}
            currencyRate={CURRENCY_RATES[currency]}
            onPurchase={(productId) => {
              setSelectedProduct(productId);
              setCustomerDetailsOpen(true);
            }}
          />
        ))}
      </div>

      <ChatDialog
        vendorName={vendor?.name || "Vendor"}
        open={chatOpen}
        onOpenChange={setChatOpen}
      />

      <CustomerDetailsDialog
        open={customerDetailsOpen}
        onOpenChange={setCustomerDetailsOpen}
        productId={selectedProduct}
        vendorName={vendor?.name}
      />
    </div>
  );
};

export default VendorDetails;