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
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

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
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "Cash",
      deliveryOption: "Standard",
      opayWalletId: "",
    },
  });

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
          amount: amount,
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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <CustomerForm form={form} isProcessing={isProcessing} />
            <PaymentMethodSelector form={form} />
            <DeliveryOptionSelector form={form} />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}