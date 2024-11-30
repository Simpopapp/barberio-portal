import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "/lovable-uploads/4615e36b-7752-4181-8a3d-4464ce5271d1.png",
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