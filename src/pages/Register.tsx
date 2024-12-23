import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { RegistrationHeader } from "@/components/registration/RegistrationHeader";

const Register = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="space-y-6">
        <RegistrationHeader 
          title="Become a Vendor" 
          description="Join our marketplace and start selling your products with a 15% commission on sales"
        />
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Register;