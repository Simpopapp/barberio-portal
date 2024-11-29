import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "./DateTimePicker";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    name: string;
    price: number;
    duration: string;
  };
}

export function AppointmentDialog({
  isOpen,
  onClose,
  service,
}: AppointmentDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: availableSlots = [], isLoading } = useQuery({
    queryKey: ["availableSlots", service.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("available_slots")
        .select("*")
        .eq("service_id", service.id)
        .eq("is_available", true)
        .gte("start_time", new Date().toISOString());

      if (error) throw error;
      return data;
    },
  });

  const createAppointment = useMutation({
    mutationFn: async ({
      date,
      slotId,
    }: {
      date: Date;
      slotId: string;
    }) => {
      const slot = availableSlots.find((s) => s.id === slotId);
      if (!slot) throw new Error("Horário não encontrado");

      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data: appointment, error: appointmentError } = await supabase
        .from("appointments")
        .insert({
          service_id: service.id,
          appointment_date: slot.start_time,
          user_id: user.id,
        })
        .select()
        .single();

      if (appointmentError) throw appointmentError;

      const { error: slotError } = await supabase
        .from("available_slots")
        .update({ is_available: false })
        .eq("id", slotId);

      if (slotError) throw slotError;

      return appointment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availableSlots"] });
      toast({
        title: "Agendamento realizado!",
        description: "Seu horário foi reservado com sucesso.",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Erro ao agendar",
        description: "Não foi possível realizar o agendamento. Tente novamente.",
        variant: "destructive",
      });
      console.error("Erro ao criar agendamento:", error);
    },
  });

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlotId, setSelectedSlotId] = useState<string>();

  const handleDateTimeSelect = (date: Date | undefined, slotId: string | undefined) => {
    setSelectedDate(date);
    setSelectedSlotId(slotId);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlotId) return;
    createAppointment.mutate({ date: selectedDate, slotId: selectedSlotId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agendar {service.name}</DialogTitle>
          <DialogDescription>
            Escolha a data e horário para seu agendamento
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between text-sm">
            <span>Serviço:</span>
            <span className="font-medium">{service.name}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Valor:</span>
            <span className="font-medium">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(service.price)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Duração:</span>
            <span className="font-medium">{service.duration}</span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <span className="text-sm text-muted-foreground">
                Carregando horários disponíveis...
              </span>
            </div>
          ) : (
            <DateTimePicker
              availableSlots={availableSlots}
              onSelectDateTime={handleDateTimeSelect}
            />
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedSlotId || createAppointment.isPending}
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}