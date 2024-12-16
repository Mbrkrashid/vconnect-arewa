import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="relative bg-white">
          <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Connect with Trusted</span>
                <span className="block text-primary">Local Vendors</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Connect with trusted local vendors in Kano state. Easy payments, secure transactions, and reliable service.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Link to="/vendors">
                  <Button size="lg" className="px-8">
                    Find Vendors
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="px-8">
                    Become a Vendor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="bg-primary/10 rounded-lg p-6 mb-4">
                  <svg
                    className="w-12 h-12 mx-auto text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Verified Vendors</h3>
                <p className="mt-2 text-gray-600">
                  All vendors are verified and reviewed for quality service
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-lg p-6 mb-4">
                  <svg
                    className="w-12 h-12 mx-auto text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Secure Payments</h3>
                <p className="mt-2 text-gray-600">
                  Safe and secure payment processing for all transactions
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-lg p-6 mb-4">
                  <svg
                    className="w-12 h-12 mx-auto text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Quick Connect</h3>
                <p className="mt-2 text-gray-600">
                  Connect with vendors instantly and get quick responses
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;