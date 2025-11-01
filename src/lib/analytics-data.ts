export interface WeightDataPoint {
  date: string; // YYYY-MM-DD
  weight: number; // kg
}

export interface MacroDataPoint {
  date: string; // YYYY-MM-DD
  protein: number;
  carbs: number;
  fat: number;
  kcal: number;
}

export const MOCK_WEIGHT_DATA: WeightDataPoint[] = [
  { date: "2024-09-01", weight: 85.5 },
  { date: "2024-09-08", weight: 84.9 },
  { date: "2024-09-15", weight: 84.2 },
  { date: "2024-09-22", weight: 83.8 },
  { date: "2024-09-29", weight: 83.1 },
];

export const MOCK_MACRO_DATA: MacroDataPoint[] = [
  { date: "Pon", protein: 140, carbs: 230, fat: 65, kcal: 2150 },
  { date: "Wt", protein: 155, carbs: 260, fat: 75, kcal: 2300 },
  { date: "Śr", protein: 135, carbs: 240, fat: 60, kcal: 2050 },
  { date: "Czw", protein: 160, carbs: 250, fat: 70, kcal: 2250 },
  { date: "Pt", protein: 145, carbs: 270, fat: 80, kcal: 2350 },
  { date: "Sob", protein: 150, carbs: 220, fat: 68, kcal: 2100 },
  { date: "Ndz", protein: 148, carbs: 245, fat: 72, kcal: 2200 },
];