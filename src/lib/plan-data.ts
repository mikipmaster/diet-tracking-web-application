export interface Plan {
  id: string;
  name: string;
  durationDays: number;
  goal: 'reduction' | 'mass' | 'maintenance';
  kcalTarget: number;
  description: string;
  isActive: boolean;
}

export const MOCK_PLANS: Plan[] = [
  {
    id: 'p1',
    name: 'Redukcja 7-dniowa (1800 kcal)',
    durationDays: 7,
    goal: 'reduction',
    kcalTarget: 1800,
    description: 'Plan o obniżonej kaloryczności, bogaty w białko, idealny na szybki start redukcji.',
    isActive: true,
  },
  {
    id: 'p2',
    name: 'Masa Mięśniowa 14-dniowa (3000 kcal)',
    durationDays: 14,
    goal: 'mass',
    kcalTarget: 3000,
    description: 'Wysokokaloryczny plan z naciskiem na węglowodany i białko, wspierający budowę masy.',
    isActive: false,
  },
  {
    id: 'p3',
    name: 'Utrzymanie Wagi (2200 kcal)',
    durationDays: 28,
    goal: 'maintenance',
    kcalTarget: 2200,
    description: 'Zbilansowany plan na utrzymanie obecnej wagi i zdrowych nawyków.',
    isActive: false,
  },
];