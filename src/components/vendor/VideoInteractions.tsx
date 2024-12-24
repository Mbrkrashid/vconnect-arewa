import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoInteractionsProps {
  likesCount: number;
  sharesCount: number;
  isLiked: boolean;
  onLike: () => void;
  onShare: () => void;
}

export const VideoInteractions = ({
  likesCount,
  sharesCount,
  isLiked,
  onLike,
  onShare
}: VideoInteractionsProps) => {
  return (
    <div className="absolute right-4 bottom-20 flex flex-col gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={onLike}
        className={cn(
          "rounded-full bg-black/20 border-white/20 hover:bg-black/40",
          "backdrop-blur-sm transition-all duration-200 group-hover:scale-110",
          isLiked && "bg-red-500/50 hover:bg-red-500/70"
        )}
      >
        <Heart className={cn("w-6 h-6 text-white", isLiked && "fill-current")} />
        <span className="text-white text-xs mt-1">{likesCount}</span>
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
        onClick={onShare}
        className={cn(
          "rounded-full bg-black/20 border-white/20 hover:bg-black/40",
          "backdrop-blur-sm transition-all duration-200 group-hover:scale-110"
        )}
      >
        <Share2 className="w-6 h-6 text-white" />
        <span className="text-white text-xs mt-1">{sharesCount}</span>
      </Button>
    </div>
  );
};