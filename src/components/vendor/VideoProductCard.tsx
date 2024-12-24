import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, ShoppingCart, MessageCircle, Gift } from "lucide-react";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";
import { cn } from "@/lib/utils";

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
    vendor?: {
      name: string;
      avatar: string;
      rewardPoints?: number;
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
    <Card className="relative w-full h-[600px] md:h-[700px] snap-start overflow-hidden group">
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
      
      {/* Watermark */}
      <div className="absolute top-4 right-4 text-white/80 font-semibold text-sm bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
        Vendors Connect
      </div>

      {/* Vendor Profile */}
      {product.vendor && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/30 backdrop-blur-sm p-2 rounded-full border border-white/10">
          <img
            src={product.vendor.avatar}
            alt={product.vendor.name}
            className="w-10 h-10 rounded-full border-2 border-white/20"
          />
          <div className="text-white pr-2">
            <p className="font-semibold text-sm">{product.vendor.name}</p>
            {product.vendor.rewardPoints && (
              <p className="text-xs flex items-center gap-1 text-white/80">
                <Gift className="w-3 h-3" />
                {product.vendor.rewardPoints} points
              </p>
            )}
          </div>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
        <h3 className="text-white text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-white/80 text-sm mb-4">{product.description}</p>
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

      {/* Interaction Buttons */}
      <div className="absolute right-4 bottom-20 flex flex-col gap-4">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full bg-black/20 border-white/20 hover:bg-black/40",
            "backdrop-blur-sm transition-all duration-200 group-hover:scale-110"
          )}
        >
          <Heart className="w-6 h-6 text-white" />
          <span className="text-white text-xs mt-1">{product.stats.likes}</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full bg-black/20 border-white/20 hover:bg-black/40",
            "backdrop-blur-sm transition-all duration-200 group-hover:scale-110"
          )}
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="text-white text-xs mt-1">234</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full bg-black/20 border-white/20 hover:bg-black/40",
            "backdrop-blur-sm transition-all duration-200 group-hover:scale-110"
          )}
        >
          <Share2 className="w-6 h-6 text-white" />
          <span className="text-white text-xs mt-1">{product.stats.shares}</span>
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