import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ServiceCard } from "@/components/scheduling/ServiceCard";
import { Scissors } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: string;
  active: boolean;
  created_at: string;
}

interface ServicesSectionProps {
  onSchedule: (service: Service) => void;
}

export function ServicesSection({ onSchedule }: ServicesSectionProps) {
  const { data: services = [], isLoading: isLoadingServices } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("active", true);

      if (error) throw error;
      
      const uniqueServices = Array.from(
        new Map((data as Service[]).map(item => [item.id, item])).values()
      );

      return uniqueServices.map(service => ({
        ...service,
        duration: String(service.duration).replace(/\s*minutes?\s*/i, " min")
      }));
    },
  });

  return (
    <section className="container py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="relative">
          <Scissors className="h-6 w-6 text-barber-accent animate-pulse" />
          <div className="absolute inset-0 bg-barber-accent/20 blur-lg rounded-full" />
        </div>
        <h2 className="text-2xl font-bold gradient-text">Nossos Serviços</h2>
      </div>
      <div className="grid gap-4 animate-fade-in">
        {isLoadingServices ? (
          <Card className="p-6 glass-card">
            <div className="flex items-center justify-center">
              <span className="text-sm text-barber-muted">
                Carregando serviços...
              </span>
            </div>
          </Card>
        ) : (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSchedule={onSchedule}
            />
          ))
        )}
      </div>
    </section>
  );
}