import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Instagram,
  Phone,
  MessageSquare,
  Wifi,
  ParkingCircle,
  Accessibility,
  CreditCard,
  Banknote,
  CreditCard as CardIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AppointmentDialog } from "@/components/scheduling/AppointmentDialog";
import { Header } from "@/components/layout/Header";
import { ImageCarousel } from "@/components/home/ImageCarousel";
import { BusinessHours } from "@/components/home/BusinessHours";
import { ServicesSection } from "@/components/home/ServicesSection";

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: string;
  active: boolean;
  created_at: string;
}

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

  const handleSchedule = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseDialog = () => {
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-barber">
      <Header />
      <ImageCarousel />

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

      <ServicesSection onSchedule={handleSchedule} />

      <section className="container py-8 grid md:grid-cols-2 gap-8">
        <BusinessHours />

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