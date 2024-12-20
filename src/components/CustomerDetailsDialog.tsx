import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CustomerDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: number | null;
  vendorName?: string;
}

interface CustomerDetailsForm {
  name: string;
  phone: string;
  email: string;
  address: string;
  deliveryOption: "Standard" | "Express";
  paymentMethod: "Cash" | "OPay";
  opayWalletId?: string;
}

export function CustomerDetailsDialog({
  open,
  onOpenChange,
  productId,
  vendorName,
}: CustomerDetailsDialogProps) {
  const form = useForm<CustomerDetailsForm>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      deliveryOption: "Standard",
      paymentMethod: "Cash",
      opayWalletId: "",
    },
  });

  const onSubmit = (data: CustomerDetailsForm) => {
    console.log("Order details:", { productId, ...data });
    
    if (data.paymentMethod === "OPay" && !data.opayWalletId) {
      toast.error("Please enter your OPay Wallet ID");
      return;
    }

    // Here you would integrate with OPay API in production
    toast.success("Order placed successfully! You earned reward points!");
    onOpenChange(false);
    form.reset();
  };

  const watchPaymentMethod = form.watch("paymentMethod");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1234567890" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St, City, Country"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryOption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Option</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Standard" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Standard Delivery (3-5 days)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Express" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Express Delivery (1-2 days)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Cash" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Cash on Delivery
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="OPay" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          OPay Wallet
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {watchPaymentMethod === "OPay" && (
              <FormField
                control={form.control}
                name="opayWalletId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OPay Wallet ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your OPay Wallet ID"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="w-full">
              Place Order
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}