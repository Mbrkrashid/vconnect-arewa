import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const HeroSection = () => {
  return (
    <section className="pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {[1, 2, 3].map((_, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20" />
                  <img
                    src={`/placeholder.svg`}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                    <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
                    <p className="text-lg text-white/80">Discover amazing deals from our vendors</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </section>
  );
};