import React from "react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateSelectorProps {
  date: Date;
  setDate: (date: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, setDate }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday = date.toDateString() === today.toDateString();

  const handlePrevDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
  };

  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto">
      <Button variant="ghost" size="icon" onClick={handlePrevDay}>
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP", { locale: pl })
            ) : (
              <span>Wybierz datę</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => d && setDate(d)}
            initialFocus
            locale={pl}
          />
        </PopoverContent>
      </Popover>

      <Button variant="ghost" size="icon" onClick={handleNextDay} disabled={isToday}>
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default DateSelector;