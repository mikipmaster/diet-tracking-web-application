import { Utensils, Calendar, LayoutDashboard, LineChart, User } from "lucide-react";
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
    title: "Analityka",
    href: "/analytics",
    icon: LineChart,
  },
  {
    title: "Profil",
    href: "/profile",
    icon: User,
  },
];