import React from "react";
import { MOCK_RECIPES } from "@/lib/data";
import RecipeCard from "./RecipeCard";

const RecipeLibrary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_RECIPES.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeLibrary;