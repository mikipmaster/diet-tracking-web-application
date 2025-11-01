import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import Plans from "./pages/Plans";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Library from "./pages/Library";
import Notifications from "./pages/Notifications"; // Import Notifications
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" attribute="class">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/journal" element={<Layout><Journal /></Layout>} />
            <Route path="/plans" element={<Layout><Plans /></Layout>} />
            <Route path="/library" element={<Layout><Library /></Layout>} />
            <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
            <Route path="/notifications" element={<Layout><Notifications /></Layout>} /> {/* New route */}
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </QueryClientProvider>
);

export default App;