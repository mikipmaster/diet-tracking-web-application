import { Utensils, Calendar, LayoutDashboard, LineChart, User, BookOpen, Bell } from "lucide-react";
import { Icon as LucideIcon } from "lucide-react";

interface NavLink {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLink[] = [
  {
    title: "Pulpit",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Dziennik",
    href: "/journal",
    icon: Calendar,
  },
  {
    title: "Plany",
    href: "/plans",
    icon: Utensils,
  },
  {
    title: "Biblioteka",
    href: "/library",
    icon: BookOpen,
  },
  {
    title: "Analityka",
    href: "/analytics",
    icon: LineChart,
  },
  {
    title: "Powiadomienia",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Profil",
    href: "/profile",
    icon: User,
  },
];