import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";

interface VideoProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    stats: {
      likes: number;
      shares: number;
    };
  };
  currency: string;
  currencyRate: number;
}

export const VideoProductCard = ({
  product,
  currency,
  currencyRate,
}: VideoProductCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

  const convertPrice = (priceUSD: number) => {
    const convertedPrice = priceUSD * currencyRate;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
  };

  return (
    <Card className="relative w-full h-[400px] md:h-[500px] snap-start">
      <video
        className="w-full h-full object-cover rounded-lg"
        src={product.videoUrl}
        poster={product.thumbnailUrl}
        loop
        playsInline
        onClick={() => setIsPlaying(!isPlaying)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        autoPlay
        muted
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-white text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-white/80 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-white text-lg font-bold">
            {convertPrice(product.price)}
          </span>
          <Button
            onClick={() => setShowPurchaseDialog(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy Now
          </Button>
        </div>
      </div>

      <div className="absolute right-4 bottom-20 flex flex-col gap-4">
        <Button variant="outline" size="icon" className="rounded-full bg-black/20 border-white/20 hover:bg-black/40">
          <Heart className="w-6 h-6 text-white" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-black/20 border-white/20 hover:bg-black/40">
          <Share2 className="w-6 h-6 text-white" />
        </Button>
      </div>

      <CustomerDetailsDialog
        open={showPurchaseDialog}
        onOpenChange={setShowPurchaseDialog}
        productId={product.id}
      />
    </Card>
  );
};