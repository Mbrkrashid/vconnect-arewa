import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VideoCardHeader } from "./VideoCardHeader";
import { VideoCardFooter } from "./VideoCardFooter";
import { VideoInteractions } from "./VideoInteractions";
import { useVideoInteractions } from "@/hooks/useVideoInteractions";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react"; // Add the missing import

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
  onPurchase: () => void;
}

export const VideoProductCard = ({
  product,
  currency,
  currencyRate,
  onPurchase,
}: VideoProductCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const {
    isLiked,
    likesCount,
    sharesCount,
    handleLike,
    handleShare
  } = useVideoInteractions(
    product.id,
    Number(product.stats.likes),
    Number(product.stats.shares)
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
        onPurchase={onPurchase}
      />

      <VideoInteractions
        likesCount={Number(likesCount)}
        sharesCount={Number(sharesCount)}
        isLiked={isLiked}
        onLike={handleLike}
        onShare={handleShare}
      />
    </Card>
  );
};
