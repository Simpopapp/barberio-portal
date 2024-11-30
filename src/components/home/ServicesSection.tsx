import { Card } from "@/components/ui/card";
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
      
      // Convert the array to a Set to remove duplicates based on ID
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
              onSchedule={onSchedule}
            />
          ))
        )}
      </div>
    </section>
  );
}