import React from "react";
import { NotificationSchedule, DAY_NAMES } from "@/lib/notification-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScheduleCardProps {
  schedule: NotificationSchedule;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule }) => {
  // Mock handler for toggling the switch
  const handleToggle = (checked: boolean) => {
    console.log(`Schedule ${schedule.id} toggled to ${checked}`);
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <schedule.icon className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl">{schedule.title}</CardTitle>
        </div>
        <Switch checked={schedule.enabled} onCheckedChange={handleToggle} />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Godzina:</span>
          <Badge variant="secondary" className="text-lg font-semibold">{schedule.time}</Badge>
        </div>
        <div className="flex space-x-1 justify-between pt-2 border-t">
          {DAY_NAMES.map((day, index) => (
            <div
              key={day}
              className={cn(
                "text-xs w-8 h-8 flex items-center justify-center rounded-full transition-colors",
                schedule.daysOfWeek.includes(index)
                  ? "bg-primary text-primary-foreground font-bold"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {day}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;