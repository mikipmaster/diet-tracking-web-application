import React from "react";
import { FoodItem } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";

interface FoodCardProps {
  food: FoodItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const n = food.nutrientsPer100g;
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg truncate">{food.name}</CardTitle>
        {food.brand && <p className="text-xs text-muted-foreground">{food.brand}</p>}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-primary">{n.kcal} kcal</span>
          <span className="text-sm text-muted-foreground">/ 100g</span>
        </div>
        <div className="grid grid-cols-3 text-center text-sm border-t pt-2">
          <div>
            <span className="font-semibold text-blue-500">{n.protein}g</span>
            <p className="text-xs text-muted-foreground">Białko</p>
          </div>
          <div>
            <span className="font-semibold text-yellow-500">{n.carbs}g</span>
            <p className="text-xs text-muted-foreground">Węgl.</p>
          </div>
          <div>
            <span className="font-semibold text-red-500">{n.fat}g</span>
            <p className="text-xs text-muted-foreground">Tłuszcz</p>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" /> Dodaj
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodCard;