import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle, Gift } from "lucide-react";

interface VendorHeaderProps {
  vendorName: string;
  vendorDescription: string;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
  onChatOpen: () => void;
}

export const VendorHeader = ({
  vendorName,
  vendorDescription,
  categories,
  selectedCategory,
  onCategoryChange,
  currency,
  onCurrencyChange,
  onChatOpen,
}: VendorHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex items-center gap-4">
          <img
            src="/lovable-uploads/48779d7e-e936-4511-b4a2-cd75cb9332eb.png"
            alt="Vendors Connect Logo"
            className="w-12 h-12"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{vendorName}</h1>
            <p className="text-sm text-muted-foreground">{vendorDescription}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 md:gap-4">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={currency} onValueChange={onCurrencyChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="NGN">NGN (₦)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={onChatOpen}
            className="flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden md:inline">Chat with Vendor</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            <Gift className="h-4 w-4" />
            <span className="hidden md:inline">Rewards</span>
          </Button>
        </div>
      </div>
    </div>
  );
};