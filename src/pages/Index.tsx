import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Clock,
  MapPin,
  Wifi,
  ParkingCircle,
  Accessibility,
  CreditCard,
  Instagram,
  Phone,
  Search,
  Calendar,
  Menu,
  Banknote,
  CreditCard as CardIcon,
  MessageSquare,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { AppointmentDialog } from "@/components/scheduling/AppointmentDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ServiceCard } from "@/components/scheduling/ServiceCard";

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: string;
  active: boolean;
  created_at: string;
}

const businessHours = [
  { day: "Segunda-Feira", hours: "08:00 - 19:00" },
  { day: "Terça-Feira", hours: "08:00 - 19:00" },
  { day: "Quarta-Feira", hours: "08:00 - 19:00" },
  { day: "Quinta-Feira", hours: "08:00 - 19:00" },
  { day: "Sexta-Feira", hours: "08:00 - 19:00" },
  { day: "Sábado", hours: "08:00 - 17:00", special: true },
  { day: "Domingo", hours: "Fechado" },
];

const amenities = [
  { icon: Wifi, label: "Wi-Fi Grátis", description: "Internet de alta velocidade disponível" },
  { icon: ParkingCircle, label: "Estacionamento", description: "Estacionamento gratuito no local" },
  { icon: Accessibility, label: "Acessibilidade", description: "Ambiente com acesso facilitado" },
  { icon: CreditCard, label: "Cartão aceito", description: "Aceitamos todas as bandeiras" },
];

const paymentMethods = [
  { icon: Banknote, label: "Dinheiro" },
  { icon: CardIcon, label: "Cartão de Crédito" },
  { icon: CardIcon, label: "Cartão de Débito" },
  { icon: CreditCard, label: "PIX" },
];

const Index = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const { data: services = [], isLoading: isLoadingServices } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("active", true);

      if (error) throw error;
      return (data as Service[]).map(service => ({
        ...service,
        duration: String(service.duration).replace(/\s*minutes?\s*/i, " min")
      }));
    },
  });

  const handleSchedule = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseDialog = () => {
    setSelectedService(null);
  };

  const images = [
    "/lovable-uploads/4615e36b-7752-4181-8a3d-4464ce5271d1.png",
    "/placeholder.svg",
    "/placeholder.svg",
  ];

  return (
    <div className="min-h-screen bg-barber">
      <header className="sticky top-0 z-50 border-b border-barber-muted/20 bg-barber/95 backdrop-blur">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold">Sr. Oliveira Barbearia</h1>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="hover:text-barber-accent transition-colors">
                Início
              </Link>
              <Link to="/search" className="hover:text-barber-accent transition-colors">
                <Search className="h-4 w-4" />
              </Link>
              <Link to="/appointments" className="hover:text-barber-accent transition-colors">
                <Calendar className="h-4 w-4" />
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-barber-accent text-white">Entrar</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Entrar na sua conta</DialogTitle>
                  <DialogDescription>
                    Faça login para agendar seus serviços
                  </DialogDescription>
                </DialogHeader>
                {/* Login form will be added here */}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

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

      <section className="container py-8">
        <Card className="p-6 bg-secondary/50">
          <p className="text-lg text-center">
            Bem-vindo à Sr. Oliveira Barbearia, onde tradição e estilo se encontram. 
            Oferecemos serviços de alta qualidade em um ambiente acolhedor e profissional.
          </p>
        </Card>
      </section>

      <section className="container py-8">
        <h2 className="text-xl font-semibold mb-4">Comodidades</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {amenities.map((amenity) => (
            <Card
              key={amenity.label}
              className="p-4 flex items-center gap-3 bg-secondary/50 group cursor-help transition-all hover:bg-secondary"
            >
              <amenity.icon className="h-5 w-5 text-barber-accent" />
              <div>
                <span className="block">{amenity.label}</span>
                <span className="text-sm text-barber-muted hidden group-hover:block">
                  {amenity.description}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container py-8">
        <h2 className="text-xl font-semibold mb-4">Serviços</h2>
        <div className="grid gap-4">
          {isLoadingServices ? (
            <Card className="p-4 bg-secondary/50">
              <div className="flex items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  Carregando serviços...
                </span>
              </div>
            </Card>
          ) : (
            services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSchedule={handleSchedule}
              />
            ))
          )}
        </div>
      </section>

      <section className="container py-8 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Horário de atendimento</h2>
          <Card className="p-4 bg-secondary/50">
            {businessHours.map((schedule) => (
              <div
                key={schedule.day}
                className="flex justify-between py-2 border-b border-barber-muted/20 last:border-0"
              >
                <span>{schedule.day}</span>
                <span
                  className={
                    schedule.special ? "text-barber-success" : "text-barber-muted"
                  }
                >
                  {schedule.hours}
                </span>
              </div>
            ))}
          </Card>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Localização e Contato</h2>
            <Card className="p-4 bg-secondary/50">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-barber-accent" />
                <span>Rua Exemplo, 123 - Centro</span>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975870299253!2d-46.6521903!3d-23.5645229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0x63b9f0c1e10b6!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1647891723456!5m2!1spt-BR!2sbr"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg mb-4"
              ></iframe>
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/search/?api=1&query=Rua+Exemplo+123+Centro",
                    "_blank"
                  )
                }
              >
                Abrir no Google Maps
              </Button>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Formas de Pagamento</h2>
            <Card className="p-4 bg-secondary/50">
              <div className="grid grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.label}
                    className="flex items-center gap-2 text-barber-muted"
                  >
                    <method.icon className="h-4 w-4" />
                    <span>{method.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Redes Sociais</h2>
            <Card className="p-4 bg-secondary/50">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => window.open("https://instagram.com", "_blank")}
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() =>
                    window.open("https://wa.me/5511999999999", "_blank")
                  }
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => window.open("tel:+5511999999999")}
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-barber-muted/20 mt-8">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-barber-muted">
              <Link to="/terms" className="hover:text-barber-accent">
                Termos de Uso
              </Link>
              {" • "}
              <Link to="/privacy" className="hover:text-barber-accent">
                Política de Privacidade
              </Link>
            </div>
            <div className="text-sm text-barber-muted">
              Desenvolvido por{" "}
              <a
                href="https://lovable.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-barber-accent hover:underline"
              >
                Lovable
              </a>
            </div>
          </div>
        </div>
      </footer>

      {selectedService && (
        <AppointmentDialog
          isOpen={true}
          onClose={handleCloseDialog}
          service={selectedService}
        />
      )}
    </div>
  );
};

export default Index;