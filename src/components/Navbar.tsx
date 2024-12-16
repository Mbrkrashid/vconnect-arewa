import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              Kano Vendors Connect
            </Link>
          </div>
          <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </nav>
  );
};