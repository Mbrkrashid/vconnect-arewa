import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle } from "lucide-react";

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
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{vendorName}</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={onChatOpen}
            className="flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with Vendor
          </Button>
        </div>
        <div className="flex gap-4">
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
          <Select
            value={currency}
            onValueChange={(value) => onCurrencyChange(value)}
          >
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
        </div>
      </div>
      <p className="text-gray-600">{vendorDescription}</p>
    </div>
  );
};