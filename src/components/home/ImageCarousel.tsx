import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "/lovable-uploads/985f07d5-e3fe-4aee-8a16-c79bc695ba2c.png",
  "/lovable-uploads/691fb0c2-90b7-4deb-9475-09c43ede8edb.png",
  "/lovable-uploads/d49cdc8c-e31e-4269-89a4-5930461bcdcb.png",
];

export function ImageCarousel() {
  return (
    <section className="relative py-8">
      <div className="absolute inset-0 bg-gradient-to-b from-barber-dark/80 to-transparent pointer-events-none" />
      <Carousel className="w-full max-w-6xl mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[500px] animate-fade-in">
                <img
                  src={image}
                  alt={`Barbearia ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-barber-dark/80 to-transparent rounded-xl" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
}