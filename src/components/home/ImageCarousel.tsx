import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "/lovable-uploads/985f07d5-e3fe-4aee-8a16-c79bc695ba2c.png",
  "/placeholder.svg",
  "/placeholder.svg",
];

export function ImageCarousel() {
  return (
    <section className="relative">
      <Carousel className="w-full max-w-5xl mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="h-[400px] relative">
                <img
                  src={image}
                  alt={`Barbearia ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}