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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, Share2, Bookmark, Eye } from "lucide-react";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    images: string[];
    videoUrl?: string;
    category: string;
    discount: number;
    deliveryOptions: string[];
    rewardPoints: number;
    stats: {
      views: number;
      likes: number;
      shares: number;
      saves: number;
    };
  };
  currency: string;
  currencyRate: number;
  onPurchase: (productId: number) => void;
}

export const ProductCard = ({
  product,
  currency,
  currencyRate,
  onPurchase,
}: ProductCardProps) => {
  const convertPrice = (priceUSD: number, discount: number = 0) => {
    const discountedPrice = priceUSD * (1 - discount / 100);
    const convertedPrice = discountedPrice * currencyRate;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
  };

  return (
    <Card className="overflow-hidden">
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
                playsInline
                loop
                muted
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

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">{product.stats.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">{product.stats.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Share2 className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">{product.stats.shares}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bookmark className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">{product.stats.saves}</span>
            </div>
          </div>
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
          <Button onClick={() => onPurchase(product.id)}>Purchase</Button>
        </div>
      </CardContent>
    </Card>
  );
};