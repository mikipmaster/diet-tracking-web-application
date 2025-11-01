import { Utensils, Droplet, Clock } from "lucide-react";
import { Icon as LucideIcon } from "lucide-react";

export type NotificationType = 'meal' | 'water' | 'custom';

export interface NotificationSchedule {
  id: string;
  type: NotificationType;
  title: string;
  time: string; // HH:MM format
  daysOfWeek: number[]; // 0=Sunday, 1=Monday, ..., 6=Saturday
  enabled: boolean;
  icon: LucideIcon;
}

export const MOCK_SCHEDULES: NotificationSchedule[] = [
  {
    id: 'n1',
    type: 'meal',
    title: 'Przypomnienie o Śniadaniu',
    time: '08:00',
    daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
    enabled: true,
    icon: Utensils,
  },
  {
    id: 'n2',
    type: 'water',
    title: 'Picie Wody (co 2h)',
    time: '10:00',
    daysOfWeek: [1, 2, 3, 4, 5],
    enabled: true,
    icon: Droplet,
  },
  {
    id: 'n3',
    type: 'custom',
    title: 'Ważenie się',
    time: '18:00',
    daysOfWeek: [0], // Sunday
    enabled: false,
    icon: Clock,
  },
];

export const DAY_NAMES = ['Ndz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];