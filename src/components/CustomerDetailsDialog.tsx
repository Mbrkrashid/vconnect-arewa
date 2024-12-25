import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomerForm } from "./forms/CustomerForm";
import { PaymentMethodSelector } from "./payment/PaymentMethodSelector";
import { DeliveryOptionSelector } from "./delivery/DeliveryOptionSelector";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CustomerDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string | null;
  amount: number;
  vendorName?: string;
}

export function CustomerDetailsDialog({
  open,
  onOpenChange,
  productId,
  amount,
  vendorName,
}: CustomerDetailsDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsProcessing(true);
    
    try {
      if (data.paymentMethod === "OPay" && !data.opayWalletId) {
        toast.error("Please enter your OPay Wallet ID");
        return;
      }

      // Create transaction record
      const { data: transaction, error } = await supabase
        .from('transactions')
        .insert({
          product_id: productId,
          payment_method: data.paymentMethod,
          status: 'pending',
          amount: amount, // Add the amount field
          metadata: {
            delivery_option: data.deliveryOption,
            customer_details: {
              name: data.name,
              email: data.email,
              phone: data.phone,
              address: data.address
            }
          }
        })
        .select()
        .single();

      if (error) throw error;

      // Here you would integrate with OPay API in production
      toast.success("Order placed successfully! You earned reward points!");
      onOpenChange(false);
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error("Failed to process order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <CustomerForm onSubmit={handleSubmit} isProcessing={isProcessing} />
          <PaymentMethodSelector />
          <DeliveryOptionSelector />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}