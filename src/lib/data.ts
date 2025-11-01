import { Utensils, Coffee, Salad, Soup, Apple } from "lucide-react";
import { Icon as LucideIcon } from "lucide-react";

// --- Core Interfaces ---

export interface Nutrients {
  kcal: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
}

export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  nutrientsPer100g: Nutrients;
}

export interface MealEntry {
  id: string;
  foodId: string;
  name: string;
  quantityGrams: number;
  computedNutrients: Nutrients;
}

export interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'custom';
  title: string;
  icon: LucideIcon;
  entries: MealEntry[];
}

// --- Mock Data ---

export const MOCK_FOOD_ITEMS: FoodItem[] = [
  {
    id: "f1",
    name: "Pierś z kurczaka (gotowana)",
    nutrientsPer100g: { kcal: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
  },
  {
    id: "f2",
    name: "Ryż biały (gotowany)",
    nutrientsPer100g: { kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
  },
  {
    id: "f3",
    name: "Oliwa z oliwek",
    nutrientsPer100g: { kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
  },
  {
    id: "f4",
    name: "Jajko kurze",
    nutrientsPer100g: { kcal: 143, protein: 12.6, carbs: 0.7, fat: 9.9, fiber: 0 },
  },
  {
    id: "f5",
    name: "Płatki owsiane",
    nutrientsPer100g: { kcal: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6 },
  },
];

// Helper function to calculate nutrients for a given quantity
const calculateNutrients = (food: FoodItem, quantityGrams: number): Nutrients => {
  const factor = quantityGrams / 100;
  return {
    kcal: Math.round(food.nutrientsPer100g.kcal * factor),
    protein: parseFloat((food.nutrientsPer100g.protein * factor).toFixed(1)),
    carbs: parseFloat((food.nutrientsPer100g.carbs * factor).toFixed(1)),
    fat: parseFloat((food.nutrientsPer100g.fat * factor).toFixed(1)),
    fiber: parseFloat((food.nutrientsPer100g.fiber * factor).toFixed(1)),
  };
};

// --- Mock Journal Data for Today ---

const chicken = MOCK_FOOD_ITEMS[0];
const rice = MOCK_FOOD_ITEMS[1];
const oats = MOCK_FOOD_ITEMS[4];

export const MOCK_MEAL_ENTRIES: Meal[] = [
  {
    type: 'breakfast',
    title: 'Śniadanie',
    icon: Coffee,
    entries: [
      {
        id: "e1",
        foodId: oats.id,
        name: oats.name,
        quantityGrams: 80,
        computedNutrients: calculateNutrients(oats, 80),
      },
    ],
  },
  {
    type: 'lunch',
    title: 'Obiad',
    icon: Utensils,
    entries: [
      {
        id: "e2",
        foodId: chicken.id,
        name: chicken.name,
        quantityGrams: 150,
        computedNutrients: calculateNutrients(chicken, 150),
      },
      {
        id: "e3",
        foodId: rice.id,
        name: rice.name,
        quantityGrams: 100,
        computedNutrients: calculateNutrients(rice, 100),
      },
    ],
  },
  {
    type: 'snack',
    title: 'Przekąska',
    icon: Apple,
    entries: [],
  },
  {
    type: 'dinner',
    title: 'Kolacja',
    icon: Soup,
    entries: [],
  },
];

// --- Journal Utility Functions ---

export const getDailySummary = (meals: Meal[]) => {
  const totalNutrients: Nutrients = {
    kcal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
  };

  meals.forEach(meal => {
    meal.entries.forEach(entry => {
      totalNutrients.kcal += entry.computedNutrients.kcal;
      totalNutrients.protein += entry.computedNutrients.protein;
      totalNutrients.carbs += entry.computedNutrients.carbs;
      totalNutrients.fat += entry.computedNutrients.fat;
      totalNutrients.fiber += entry.computedNutrients.fiber;
    });
  });

  // Round totals
  totalNutrients.kcal = Math.round(totalNutrients.kcal);
  totalNutrients.protein = parseFloat(totalNutrients.protein.toFixed(1));
  totalNutrients.carbs = parseFloat(totalNutrients.carbs.toFixed(1));
  totalNutrients.fat = parseFloat(totalNutrients.fat.toFixed(1));
  totalNutrients.fiber = parseFloat(totalNutrients.fiber.toFixed(1));

  return totalNutrients;
};