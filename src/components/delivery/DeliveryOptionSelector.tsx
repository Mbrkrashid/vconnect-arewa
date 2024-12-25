import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormItem, FormLabel, FormControl, FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface DeliveryOptionSelectorProps {
  form: UseFormReturn<any>;
}

export function DeliveryOptionSelector({ form }: DeliveryOptionSelectorProps) {
  return (
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
        </FormItem>
      )}
    />
  );
}