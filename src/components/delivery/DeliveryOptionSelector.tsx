import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";

export function DeliveryOptionSelector() {
  return (
    <RadioGroup defaultValue="Standard" className="flex flex-col space-y-1">
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
  );
}