import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormItem, FormLabel, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface PaymentMethodSelectorProps {
  form: UseFormReturn<any>;
}

export function PaymentMethodSelector({ form }: PaymentMethodSelectorProps) {
  const watchPaymentMethod = form.watch("paymentMethod");

  return (
    <div className="space-y-4">
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
            </FormItem>
          )}
        />
      )}
    </div>
  );
}