import React from "react";
import { MOCK_FOOD_ITEMS } from "@/lib/data";
import FoodCard from "./FoodCard";

const FoodLibrary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {MOCK_FOOD_ITEMS.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodLibrary;