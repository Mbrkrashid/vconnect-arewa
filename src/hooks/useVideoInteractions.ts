import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useVideoInteractions = (videoId: string, initialLikes: number, initialShares: number) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(initialLikes);
  const [sharesCount, setSharesCount] = useState<number>(initialShares);
  const { toast } = useToast();

  useEffect(() => {
    checkIfLiked();
  }, [videoId]);

  const checkIfLiked = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user) return;

    const { data } = await supabase
      .from('video_interactions')
      .select()
      .eq('video_id', videoId)
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
          .eq('video_id', videoId)
          .eq('user_id', session.session.user.id)
          .eq('interaction_type', 'like');
        
        setLikesCount((prev) => prev - 1);
        setIsLiked(false);
        toast({
          title: "Like removed",
          description: "You've unliked this video",
        });
      } else {
        await supabase
          .from('video_interactions')
          .insert({
            video_id: videoId,
            user_id: session.session.user.id,
            interaction_type: 'like'
          });
        
        setLikesCount((prev) => prev + 1);
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
          title: "Share Video",
          text: "Check out this video!",
          url: window.location.href,
        });

        const { data: session } = await supabase.auth.getSession();
        if (session?.session?.user) {
          await supabase
            .from('video_interactions')
            .insert({
              video_id: videoId,
              user_id: session.session.user.id,
              interaction_type: 'share'
            });
        }

        setSharesCount((prev) => prev + 1);
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

  return {
    isLiked,
    likesCount,
    sharesCount,
    handleLike,
    handleShare
  };
};