import { Navigate, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

// Mock admin check - in production, this would be connected to your auth system
const isAdmin = true; // TODO: Replace with actual admin check

const AdminLayout = () => {
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/admin" className="text-xl font-bold">
            Admin Dashboard
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Admin Navigation</SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  to="/admin"
                  className="px-4 py-2 hover:bg-gray-100 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/vendors"
                  className="px-4 py-2 hover:bg-gray-100 rounded-md"
                >
                  Manage Vendors
                </Link>
                <Link
                  to="/admin/products"
                  className="px-4 py-2 hover:bg-gray-100 rounded-md"
                >
                  Manage Products
                </Link>
                <Link
                  to="/admin/users"
                  className="px-4 py-2 hover:bg-gray-100 rounded-md"
                >
                  Manage Users
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;