import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";
import { VideoCardHeader } from "./VideoCardHeader";
import { VideoCardFooter } from "./VideoCardFooter";
import { VideoInteractions } from "./VideoInteractions";
import { useVideoInteractions } from "@/hooks/useVideoInteractions";

interface VideoProductCardProps {
  product: {
    id: string;
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
  
  const {
    isLiked,
    likesCount,
    sharesCount,
    handleLike,
    handleShare
  } = useVideoInteractions(
    product.id,
    product.stats.likes,
    product.stats.shares
  );

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
      
      <VideoCardHeader vendor={product.vendor} />
      
      <VideoCardFooter
        name={product.name}
        description={product.description}
        price={convertPrice(product.price)}
        onPurchase={() => setShowPurchaseDialog(true)}
      />

      <VideoInteractions
        likesCount={parseInt(String(likesCount))}
        sharesCount={parseInt(String(sharesCount))}
        isLiked={isLiked}
        onLike={handleLike}
        onShare={handleShare}
      />

      <CustomerDetailsDialog
        open={showPurchaseDialog}
        onOpenChange={setShowPurchaseDialog}
        productId={product.id}
      />
    </Card>
  );
};