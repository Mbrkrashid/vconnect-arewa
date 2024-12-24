import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoCardFooterProps {
  name: string;
  description: string;
  price: string;
  onPurchase: () => void;
}

export const VideoCardFooter = ({ name, description, price, onPurchase }: VideoCardFooterProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
      <h3 className="text-white text-xl font-semibold mb-2">{name}</h3>
      <p className="text-white/80 text-sm mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-white text-lg font-bold">{price}</span>
        <Button
          onClick={onPurchase}
          className="bg-primary hover:bg-primary/90"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Buy Now
        </Button>
      </div>
    </div>
  );
};