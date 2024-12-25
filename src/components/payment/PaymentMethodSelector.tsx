import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function PaymentMethodSelector() {
  const [selectedMethod, setSelectedMethod] = useState<"Cash" | "OPay">("Cash");

  return (
    <div className="space-y-4">
      <RadioGroup
        value={selectedMethod}
        onValueChange={(value: "Cash" | "OPay") => setSelectedMethod(value)}
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

      {selectedMethod === "OPay" && (
        <FormItem>
          <FormLabel>OPay Wallet ID</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter your OPay Wallet ID"
              required
            />
          </FormControl>
        </FormItem>
      )}
    </div>
  );
}