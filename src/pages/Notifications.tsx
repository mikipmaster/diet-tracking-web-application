import React from "react";
import { Plus, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_SCHEDULES } from "@/lib/notification-data";
import ScheduleCard from "@/components/notifications/ScheduleCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Notifications = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Harmonogram Powiadomień</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Dodaj Przypomnienie
        </Button>
      </div>
      <p className="text-lg text-muted-foreground">
        Ustaw lokalne przypomnienia o posiłkach, wodzie i innych celach.
      </p>
      
      <Alert variant="default">
        <BellOff className="h-4 w-4" />
        <AlertTitle>Ważne!</AlertTitle>
        <AlertDescription>
          W aplikacji mobilnej powiadomienia działają lokalnie. W wersji webowej są to tylko makiety harmonogramów.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SCHEDULES.map((schedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}
      </div>
    </div>
  );
};

export default Notifications;