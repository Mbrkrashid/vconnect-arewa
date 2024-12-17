import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ChatDialog } from "@/components/ChatDialog";
import { MessageCircle } from "lucide-react";

// Currency conversion rates (in production, these would come from an API)
const CURRENCY_RATES = {
  USD: 1,
  NGN: 1200,
  EUR: 0.92,
  GBP: 0.79,
};

type Currency = keyof typeof CURRENCY_RATES;

// Temporary mock data - will be replaced with actual API calls
const mockVendorDetails = {
  id: 1,
  name: "Fashion Hub",
  description: "Quality clothing and accessories",
  products: [
    {
      id: 1,
      name: "Summer Dress",
      price: 59.99,
      description: "Beautiful floral summer dress",
      images: ["/placeholder.svg"],
      videoUrl: "https://example.com/video1.mp4",
    },
    {
      id: 2,
      name: "Leather Bag",
      price: 89.99,
      description: "Handcrafted leather shoulder bag",
      images: ["/placeholder.svg"],
      videoUrl: "https://example.com/video2.mp4",
    },
  ],
};

const VendorDetails = () => {
  const { id } = useParams();
  const [currency, setCurrency] = useState<Currency>("USD");
  const [chatOpen, setChatOpen] = useState(false);

  const { data: vendor, isLoading } = useQuery({
    queryKey: ["vendor", id],
    queryFn: () => mockVendorDetails,
  });

  const convertPrice = (priceUSD: number) => {
    const convertedPrice = priceUSD * CURRENCY_RATES[currency];
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold">{vendor?.name}</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Chat with Vendor
            </Button>
          </div>
          <Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="NGN">NGN (₦)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-gray-600">{vendor?.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendor?.products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </CarouselItem>
                ))}
                {product.videoUrl && (
                  <CarouselItem>
                    <video
                      controls
                      className="w-full h-48 object-cover"
                      src={product.videoUrl}
                    />
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  {convertPrice(product.price)}
                </span>
                <Button>Purchase</Button>
              </div>
            </CardContent>
          </Card>
        ))}
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