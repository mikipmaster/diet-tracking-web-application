import React from "react";
import { Plus } from "lucide-react";
import { Meal } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MealEntryCard from "./MealEntryCard";

interface MealSectionProps {
  meal: Meal;
}

const MealSection: React.FC<MealSectionProps> = ({ meal }) => {
  const totalKcal = meal.entries.reduce((sum, entry) => sum + entry.computedNutrients.kcal, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <meal.icon className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl font-semibold">{meal.title}</CardTitle>
        </div>
        <div className="text-lg font-bold text-primary">
          {totalKcal} kcal
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {meal.entries.length > 0 ? (
            meal.entries.map((entry) => (
              <MealEntryCard key={entry.id} entry={entry} />
            ))
          ) : (
            <p className="text-muted-foreground text-sm italic">Brak wpisów w tym posiłku.</p>
          )}
        </div>
        <Button variant="outline" className="w-full mt-4">
          <Plus className="h-4 w-4 mr-2" /> Dodaj produkt/potrawę
        </Button>
      </CardContent>
    </Card>
  );
};

export default MealSection;