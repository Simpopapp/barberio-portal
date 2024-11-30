import { Card } from "@/components/ui/card";

const businessHours = [
  { day: "Segunda-Feira", hours: "08:00 - 19:00" },
  { day: "Terça-Feira", hours: "08:00 - 19:00" },
  { day: "Quarta-Feira", hours: "08:00 - 19:00" },
  { day: "Quinta-Feira", hours: "08:00 - 19:00" },
  { day: "Sexta-Feira", hours: "08:00 - 19:00" },
  { day: "Sábado", hours: "08:00 - 17:00", special: true },
  { day: "Domingo", hours: "Fechado" },
];

export function BusinessHours() {
  return (
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
  );
}