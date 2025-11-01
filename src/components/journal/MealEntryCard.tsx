import React from "react";
import { Trash2, Edit } from "lucide-react";
import { MealEntry } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MealEntryCardProps {
  entry: MealEntry;
}

const MealEntryCard: React.FC<MealEntryCardProps> = ({ entry }) => {
  return (
    <Card className="mb-2">
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{entry.name}</p>
          <p className="text-sm text-muted-foreground">
            {entry.quantityGrams} g • {entry.computedNutrients.kcal} kcal
          </p>
          <div className="flex text-xs text-muted-foreground mt-1 space-x-3">
            <span>B: {entry.computedNutrients.protein}g</span>
            <span>W: {entry.computedNutrients.carbs}g</span>
            <span>T: {entry.computedNutrients.fat}g</span>
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealEntryCard;