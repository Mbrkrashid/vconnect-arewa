import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FEF7CD]/10">
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-[#FEF7CD]/20 to-white">
          <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-[#403E43] sm:text-5xl md:text-6xl">
                <span className="block">Arewa Vendors</span>
                <span className="block text-primary">Connect & Shop</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Your trusted marketplace for authentic Northern Nigerian products. Connect with local vendors, shop with confidence.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 px-4">
                <Link to="/vendors" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto px-8 bg-[#403E43] hover:bg-[#403E43]/90">
                    Find Vendors
                  </Button>
                </Link>
                <Link to="/register" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 border-[#403E43] text-[#403E43] hover:bg-[#403E43]/10">
                    Become a Vendor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center p-6 rounded-lg bg-[#FEF7CD]/10 hover:bg-[#FEF7CD]/20 transition-colors">
                <div className="bg-[#FEC6A1]/20 rounded-lg p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#403E43]"
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
                <h3 className="text-xl font-semibold text-[#403E43]">Trusted Vendors</h3>
                <p className="mt-2 text-gray-600">
                  Connect with verified local vendors from across Northern Nigeria
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-[#FEF7CD]/10 hover:bg-[#FEF7CD]/20 transition-colors">
                <div className="bg-[#FEC6A1]/20 rounded-lg p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#403E43]"
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
                <h3 className="text-xl font-semibold text-[#403E43]">Secure Payments</h3>
                <p className="mt-2 text-gray-600">
                  Safe transactions with multiple payment options including OPay
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-[#FEF7CD]/10 hover:bg-[#FEF7CD]/20 transition-colors">
                <div className="bg-[#FEC6A1]/20 rounded-lg p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-[#403E43]"
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
                <h3 className="text-xl font-semibold text-[#403E43]">Quick Connect</h3>
                <p className="mt-2 text-gray-600">
                  Easy communication with vendors through our platform
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