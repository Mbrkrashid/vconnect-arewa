import { Product } from "@/hooks/useProducts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
          <Link to={`/product/${product.id}`}>
            <div className="aspect-square overflow-hidden bg-gray-100 rounded-t-lg">
              <img
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium line-clamp-2 text-sm">{product.name}</h3>
                <Badge variant="secondary" className="shrink-0">
                  {product.category?.name}
                </Badge>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm ml-1">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews_count})
                </span>
              </div>
              <p className="mt-2 text-lg font-bold text-purple-600">
                ₦{product.price.toLocaleString()}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button size="sm" className="w-full rounded-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};