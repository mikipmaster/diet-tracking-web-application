import React, { useState, useMemo } from "react";
import { MOCK_MEAL_ENTRIES, getDailySummary, Nutrients } from "@/lib/data";
import DateSelector from "@/components/journal/DateSelector";
import DailySummary from "@/components/journal/DailySummary";
import MealSection from "@/components/journal/MealSection";
import { Separator } from "@/components/ui/separator";

// Mock targets (should come from user profile/goals)
const MOCK_TARGETS: Nutrients = {
  kcal: 2200,
  protein: 150,
  carbs: 250,
  fat: 70,
  fiber: 30,
};

const Journal = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // In a real app, this would fetch data based on selectedDate
  const dailyMeals = MOCK_MEAL_ENTRIES; 
  
  const dailySummary = useMemo(() => getDailySummary(dailyMeals), [dailyMeals]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dziennik Posiłków</h1>
      
      <DateSelector date={selectedDate} setDate={setSelectedDate} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DailySummary summary={dailySummary} targets={MOCK_TARGETS} />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold">Wpisy Posiłków</h2>
          <Separator />
          
          {dailyMeals.map((meal) => (
            <MealSection key={meal.type} meal={meal} />
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default Journal;