import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: string;
    duration: string;
  };
  onSchedule: (service: ServiceCardProps["service"]) => void;
}

export function ServiceCard({ service, onSchedule }: ServiceCardProps) {
  return (
    <Card className="p-4 bg-secondary/50">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{service.name}</h3>
          <p className="text-sm text-barber-muted mb-2">{service.description}</p>
          <p className="text-sm text-barber-muted">
            <Clock className="h-4 w-4 inline mr-1" />
            Duração: {service.duration}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-barber-accent font-semibold">{service.price}</span>
          <Button
            size="sm"
            className="bg-barber-accent"
            onClick={() => onSchedule(service)}
          >
            Agendar
          </Button>
        </div>
      </div>
    </Card>
  );
}