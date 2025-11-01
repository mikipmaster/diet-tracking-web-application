import React from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { MadeWithDyad } from "./made-with-dyad";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col pb-16 md:pb-0">
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
        <div className="hidden md:block">
          <MadeWithDyad />
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default Layout;