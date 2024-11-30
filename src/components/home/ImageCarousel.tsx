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
      <div className="absolute inset-0 bg-gradient-to-b from-barber-dark/80 via-transparent to-transparent pointer-events-none" />
      <Carousel className="w-full max-w-6xl mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[500px] animate-fade-in group">
                <img
                  src={image}
                  alt={`Barbearia ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-barber-dark via-barber-dark/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 rounded-xl" />
                <div className="absolute inset-0 flex items-end p-8">
                  <div className="text-left space-y-2 animate-slide-up">
                    <h3 className="text-2xl font-bold text-white">
                      Experiência Premium
                    </h3>
                    <p className="text-barber-foreground/80 max-w-md">
                      Ambiente sofisticado e acolhedor para cuidar do seu estilo
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hover:bg-barber-accent/20" />
        <CarouselNext className="right-4 hover:bg-barber-accent/20" />
      </Carousel>
    </section>
  );
}