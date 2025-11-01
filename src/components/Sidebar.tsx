import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex flex-col h-full border-r bg-sidebar w-64 p-4">
      <div className="text-2xl font-bold text-sidebar-primary mb-8">
        FitMajster
      </div>
      <nav className="flex flex-col space-y-2">
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Button
              key={link.href}
              asChild
              variant="ghost"
              className={cn(
                "justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-semibold",
              )}
            >
              <Link to={link.href}>
                <link.icon className="mr-3 h-5 w-5" />
                {link.title}
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;