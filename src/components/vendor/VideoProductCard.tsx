import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { VideoCardHeader } from "./VideoCardHeader";
import { VideoCardFooter } from "./VideoCardFooter";
import { VideoInteractions } from "./VideoInteractions";

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
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(product.stats.likes);
  const [sharesCount, setSharesCount] = useState(product.stats.shares);
  const { toast } = useToast();

  useEffect(() => {
    checkIfLiked();
  }, []);

  const checkIfLiked = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) return;

    const { data } = await supabase
      .from('video_interactions')
      .select()
      .eq('video_id', product.id)
      .eq('user_id', session.session.user.id)
      .eq('interaction_type', 'like')
      .maybeSingle();

    setIsLiked(!!data);
  };

  const handleLike = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like videos",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isLiked) {
        await supabase
          .from('video_interactions')
          .delete()
          .eq('video_id', product.id)
          .eq('user_id', session.session.user.id)
          .eq('interaction_type', 'like');
        
        setLikesCount(prev => prev - 1);
        setIsLiked(false);
        toast({
          title: "Like removed",
          description: "You've unliked this video",
        });
      } else {
        await supabase
          .from('video_interactions')
          .insert({
            video_id: product.id,
            user_id: session.session.user.id,
            interaction_type: 'like'
          });
        
        setLikesCount(prev => prev + 1);
        setIsLiked(true);
        toast({
          title: "Video liked",
          description: "You've liked this video",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });

        const { data: session } = await supabase.auth.getSession();
        if (session?.session?.user) {
          await supabase
            .from('video_interactions')
            .insert({
              video_id: product.id,
              user_id: session.session.user.id,
              interaction_type: 'share'
            });
        }

        setSharesCount(prev => prev + 1);
        toast({
          title: "Shared successfully",
          description: "Thanks for sharing!",
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied",
          description: "Video link copied to clipboard",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share video",
        variant: "destructive",
      });
    }
  };

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
      />
    </Card>
  );
};