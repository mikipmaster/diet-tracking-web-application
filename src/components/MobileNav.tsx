import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

const MobileNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-background border-t shadow-lg z-50">
      <nav className="flex justify-around h-16 items-center">
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 text-sm transition-colors",
                isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <link.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{link.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNav;