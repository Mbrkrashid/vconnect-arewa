import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// Temporary mock data - will be replaced with actual API calls
const mockVendorDetails = {
  id: 1,
  name: "Fashion Hub",
  description: "Quality clothing and accessories",
  products: [
    {
      id: 1,
      name: "Summer Dress",
      price: 59.99,
      description: "Beautiful floral summer dress",
      images: ["/placeholder.svg"],
      videoUrl: "https://example.com/video1.mp4",
    },
    {
      id: 2,
      name: "Leather Bag",
      price: 89.99,
      description: "Handcrafted leather shoulder bag",
      images: ["/placeholder.svg"],
      videoUrl: "https://example.com/video2.mp4",
    },
  ],
};

const VendorDetails = () => {
  const { id } = useParams();

  const { data: vendor, isLoading } = useQuery({
    queryKey: ["vendor", id],
    queryFn: () => mockVendorDetails, // This will be replaced with actual API call
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{vendor?.name}</h1>
        <p className="text-gray-600">{vendor?.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendor?.products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </CarouselItem>
                ))}
                {product.videoUrl && (
                  <CarouselItem>
                    <video
                      controls
                      className="w-full h-48 object-cover"
                      src={product.videoUrl}
                    />
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                <Button>Purchase</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VendorDetails;