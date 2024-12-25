import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary">
              Vendors Connect Arewa
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with trusted vendors and discover amazing products in Northern Nigeria
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto"
          >
            <Link to="/register" className="w-full sm:w-1/2">
              <Button
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                size="lg"
              >
                Become a Vendor
              </Button>
            </Link>
            <Link to="/vendors" className="w-full sm:w-1/2">
              <Button
                variant="outline"
                className="w-full h-12 text-lg border-primary text-primary hover:bg-primary/10"
                size="lg"
              >
                Browse Vendors
              </Button>
            </Link>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold mb-2">Trusted Vendors</h3>
              <p className="text-gray-600">Connect with verified vendors from across Northern Nigeria</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Discover high-quality products from local businesses</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Easy Mobile Access</h3>
              <p className="text-gray-600">Shop and manage your business from anywhere</p>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Vendors Connect Arewa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;