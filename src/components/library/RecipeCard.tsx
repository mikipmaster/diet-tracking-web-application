import React from "react";
import { Recipe } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Zap } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const n = recipe.computedNutrients;
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl">{recipe.name}</CardTitle>
        <CardDescription>{recipe.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-primary flex items-center">
            <Zap className="h-5 w-5 mr-2" /> {n.kcal} kcal
          </span>
          <span className="text-sm text-muted-foreground">Porcje: {recipe.servings}</span>
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

export default RecipeCard;