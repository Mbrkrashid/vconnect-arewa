import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

// Temporary mock data - will be replaced with actual API calls
const mockVendors = [
  {
    id: 1,
    name: "Fashion Hub",
    description: "Quality clothing and accessories",
    productsCount: 15,
    daysLeft: 5,
  },
  {
    id: 2,
    name: "Tech Store",
    description: "Latest gadgets and electronics",
    productsCount: 8,
    daysLeft: 3,
  },
];

const Vendors = () => {
  const { data: vendors, isLoading } = useQuery({
    queryKey: ["vendors"],
    queryFn: () => mockVendors, // This will be replaced with actual API call
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Active Vendors</h1>
        <Link to="/vendor/register">
          <Button>Become a Vendor</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors?.map((vendor) => (
          <Link key={vendor.id} to={`/vendor/${vendor.id}`}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{vendor.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{vendor.description}</p>
                <div className="flex justify-between text-sm">
                  <span>{vendor.productsCount} products</span>
                  <span className="text-primary">{vendor.daysLeft} days left</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Vendors;