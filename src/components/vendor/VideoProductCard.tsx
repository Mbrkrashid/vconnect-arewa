import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";
import { VideoCardHeader } from "./VideoCardHeader";
import { VideoCardFooter } from "./VideoCardFooter";
import { VideoInteractions } from "./VideoInteractions";
import { useVideoInteractions } from "@/hooks/useVideoInteractions";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

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
    isSponsored?: boolean;
    promotionId?: string;
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

  const handleVideoPlay = async () => {
    setIsPlaying(true);
    if (product.isSponsored && product.promotionId) {
      try {
        await supabase.from('ad_impressions').insert({
          promotion_id: product.promotionId,
          impression_type: 'view',
          device_info: {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
          },
        });
      } catch (error) {
        console.error('Error logging ad impression:', error);
      }
    }
  };

  return (
    <Card className="relative w-full h-[600px] md:h-[700px] snap-start overflow-hidden group">
      {product.isSponsored && (
        <Badge 
          variant="secondary" 
          className="absolute top-4 right-4 z-10 bg-black/50 text-white"
        >
          Sponsored
        </Badge>
      )}
      
      <video
        className="w-full h-full object-cover rounded-lg"
        src={product.videoUrl}
        poster={product.thumbnailUrl}
        loop
        playsInline
        onClick={() => setIsPlaying(!isPlaying)}
        onPlay={handleVideoPlay}
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
        likesCount={likesCount}
        sharesCount={sharesCount}
        isLiked={isLiked}
        onLike={handleLike}
        onShare={handleShare}
      />

      <CustomerDetailsDialog
        open={showPurchaseDialog}
        onOpenChange={setShowPurchaseDialog}
        productId={product.id}
        vendorName={product.vendor?.name}
      />
    </Card>
  );
};