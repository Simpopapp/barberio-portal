import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DateTimePickerProps {
  availableSlots: {
    id: string;
    start_time: string;
    end_time: string;
  }[];
  onSelectDateTime: (date: Date | undefined, slotId: string | undefined) => void;
}

export function DateTimePicker({
  availableSlots,
  onSelectDateTime,
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlotId, setSelectedSlotId] = useState<string>();

  const availableSlotsForDate = availableSlots.filter((slot) => {
    if (!selectedDate) return false;
    const slotDate = new Date(slot.start_time);
    return (
      slotDate.getDate() === selectedDate.getDate() &&
      slotDate.getMonth() === selectedDate.getMonth() &&
      slotDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlotId(undefined);
    onSelectDateTime(date, undefined);
  };

  const handleTimeSelect = (slotId: string) => {
    setSelectedSlotId(slotId);
    onSelectDateTime(selectedDate, slotId);
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        locale={ptBR}
        disabled={(date) => {
          // Desabilita datas passadas e domingos
          return (
            date < new Date() || date.getDay() === 0
          );
        }}
      />

      {selectedDate && availableSlotsForDate.length > 0 && (
        <Select value={selectedSlotId} onValueChange={handleTimeSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um horário" />
          </SelectTrigger>
          <SelectContent>
            {availableSlotsForDate.map((slot) => (
              <SelectItem key={slot.id} value={slot.id}>
                {format(new Date(slot.start_time), "HH:mm")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {selectedDate && availableSlotsForDate.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhum horário disponível para esta data.
        </p>
      )}
    </div>
  );
}