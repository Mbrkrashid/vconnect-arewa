import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./registrationSchema";

type BusinessTypeFieldProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>;
};

export const BusinessTypeField = ({ form }: BusinessTypeFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="business_type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Business Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your business type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="wholesale">Wholesale</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="food">Food & Beverages</SelectItem>
              <SelectItem value="fashion">Fashion & Apparel</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};