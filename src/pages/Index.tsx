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
} from "lucide-react";

const services = [
  {
    id: 1,
    name: "SOBRANCELHA",
    price: "R$ 15,00",
    duration: "15 min",
  },
  {
    id: 2,
    name: "BARBA (BARBOTERAPIA FEITO COM COZINHO)",
    price: "R$ 35,00",
    duration: "30 min",
  },
  {
    id: 3,
    name: "BARBA E PEZINHO",
    price: "R$ 45,00",
    duration: "45 min",
  },
  {
    id: 4,
    name: "CORTE",
    price: "R$ 35,00",
    duration: "30 min",
  },
];

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
  { icon: Wifi, label: "Wi-Fi" },
  { icon: ParkingCircle, label: "Estacionamento" },
  { icon: Accessibility, label: "Acessibilidade" },
  { icon: CreditCard, label: "Cartão aceito" },
];

const Index = () => {
  const [currentImageIndex] = useState(0);
  const images = ["/lovable-uploads/4615e36b-7752-4181-8a3d-4464ce5271d1.png"];

  return (
    <div className="min-h-screen bg-barber">
      {/* Header */}
      <header className="border-b border-barber-muted/20">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Sr. Oliveira Barbearia</h1>
          <Button variant="outline" className="bg-barber-accent text-white">
            Agendar agora
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt="Barbearia"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Amenities */}
      <section className="container py-8">
        <h2 className="text-xl font-semibold mb-4">Comodidades</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {amenities.map((amenity) => (
            <Card
              key={amenity.label}
              className="p-4 flex items-center gap-3 bg-secondary/50"
            >
              <amenity.icon className="h-5 w-5 text-barber-accent" />
              <span>{amenity.label}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container py-8">
        <h2 className="text-xl font-semibold mb-4">Serviços</h2>
        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.id} className="p-4 bg-secondary/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-barber-muted">
                    Duração: {service.duration}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-barber-accent font-semibold">
                    {service.price}
                  </span>
                  <Button size="sm" className="bg-barber-accent">
                    Agendar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Business Hours & Contact */}
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

        <div>
          <h2 className="text-xl font-semibold mb-4">Localização e Contato</h2>
          <Card className="p-4 bg-secondary/50">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-barber-accent" />
              <span>Rua Exemplo, 123 - Centro</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Phone className="text-barber-accent" />
              <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => window.open("https://instagram.com", "_blank")}
              >
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;