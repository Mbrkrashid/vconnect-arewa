import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { RegistrationHeader } from "@/components/registration/RegistrationHeader";
import { Navbar } from "@/components/Navbar";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-24 max-w-2xl">
        <div className="bg-white shadow-sm rounded-lg p-8 space-y-6">
          <RegistrationHeader 
            title="Become a Vendor" 
            description="Join our marketplace and start selling your products with a 15% commission on sales"
          />
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Register;