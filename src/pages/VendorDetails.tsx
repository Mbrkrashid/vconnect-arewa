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
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      category: "Clothing",
      discount: 10,
      deliveryOptions: ["Standard", "Express"],
      rewardPoints: 50,
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

  const convertPrice = (priceUSD: number, discount: number = 0) => {
    const discountedPrice = priceUSD * (1 - discount / 100);
    const convertedPrice = discountedPrice * CURRENCY_RATES[currency];
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
  };

  const filteredProducts = vendor?.products.filter(
    (product) => selectedCategory === "All" || product.category === selectedCategory
  );

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
          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {vendor?.categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
        </div>
        <p className="text-gray-600">{vendor?.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.map((product) => (
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
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <span className="text-sm text-gray-500">{product.category}</span>
              </div>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-lg font-bold">
                    {convertPrice(product.price, product.discount)}
                  </span>
                  {product.discount > 0 && (
                    <span className="ml-2 text-sm text-red-500">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <span className="text-sm text-green-600">
                  Earn {product.rewardPoints} points
                </span>
              </div>
              <div className="flex justify-between items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Delivery Options
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {product.deliveryOptions.map((option) => (
                      <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  onClick={() => {
                    setSelectedProduct(product.id);
                    setCustomerDetailsOpen(true);
                  }}
                >
                  Purchase
                </Button>
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