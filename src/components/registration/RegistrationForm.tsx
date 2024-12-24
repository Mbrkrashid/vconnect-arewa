import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BusinessInfoFields } from "./BusinessInfoFields";
import { ContactInfoFields } from "./ContactInfoFields";
import { BusinessTypeField } from "./BusinessTypeField";
import { formSchema } from "./registrationSchema";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Separator } from "@/components/ui/separator";

export const RegistrationForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name: "",
      email: "",
      phone_number: "",
      address: "",
      business_type: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Ensure all required fields are present
      const vendorData = {
        business_name: values.business_name,
        email: values.email,
        phone_number: values.phone_number,
        address: values.address,
        business_type: values.business_type,
        description: values.description,
      };

      const { error } = await supabase
        .from('vendors')
        .insert(vendorData);

      if (error) throw error;

      toast({
        title: "Registration Successful",
        description: "Welcome to our marketplace! You can now start selling products.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        title: "Registration Failed",
        description: "There was an error during registration. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Sign up with Google</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          view="sign_up"
          showLinks={false}
          theme="light"
        />
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or register manually
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BusinessInfoFields form={form} />
          <ContactInfoFields form={form} />
          <BusinessTypeField form={form} />
          
          <Button type="submit" className="w-full">
            Register as Vendor
          </Button>
        </form>
      </Form>
    </div>
  );
};