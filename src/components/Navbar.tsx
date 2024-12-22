import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-primary">
              Vendors Connect Arewa
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/vendors">
              <Button variant="ghost">Browse Vendors</Button>
            </Link>
            <Link to="/register">
              <Button variant="default">Become a Vendor</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            <Link
              to="/vendors"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Vendors
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Become a Vendor
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};