import * as z from "zod";

export const formSchema = z.object({
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(11, "Phone number must be at least 11 digits"),
  address: z.string().min(10, "Please provide a complete address"),
  business_type: z.string().min(1, "Please select a business type"),
  description: z.string().min(20, "Please provide a brief description of your business"),
});