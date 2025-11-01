import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Utensils, Droplet, Zap, Activity, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data for Dashboard
const dailyGoals = {
  kcal: { current: 1500, target: 2200, color: "bg-primary" },
  protein: { current: 80, target: 150, unit: "g", color: "bg-blue-500" },
  carbs: { current: 180, target: 250, unit: "g", color: "bg-yellow-500" },
  fat: { current: 45, target: 70, unit: "g", color: "bg-red-500" },
  water: { current: 1.2, target: 3.0, unit: "L", color: "bg-cyan-500" },
};

const QuickStatCard: React.FC<{ title: string; current: number; target: number; unit: string; color: string }> = ({ title, current, target, unit, color }) => {
  const percentage = target > 0 ? Math.min(100, (current / target) * 100) : 0;
  
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Zap className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">
          {current} / {target} {unit}
        </div>
        <Progress value={percentage} className={`h-2 ${color}`} />
        <p className="text-xs text-muted-foreground mt-1">
          {Math.round(target - current)} {unit} pozostało
        </p>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Pulpit FitMajster</h1>
      <p className="text-xl text-muted-foreground">
        Witaj z powrotem! Zobacz, jak idzie Ci dzisiaj.
      </p>
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <QuickStatCard 
          title="Kalorie" 
          current={dailyGoals.kcal.current} 
          target={dailyGoals.kcal.target} 
          unit="kcal" 
          color="bg-primary" 
        />
        <QuickStatCard 
          title="Białko" 
          current={dailyGoals.protein.current} 
          target={dailyGoals.protein.target} 
          unit="g" 
          color="bg-blue-500" 
        />
        <QuickStatCard 
          title="Węglowodany" 
          current={dailyGoals.carbs.current} 
          target={dailyGoals.carbs.target} 
          unit="g" 
          color="bg-yellow-500" 
        />
        <QuickStatCard 
          title="Tłuszcze" 
          current={dailyGoals.fat.current} 
          target={dailyGoals.fat.target} 
          unit="g" 
          color="bg-red-500" 
        />
        <QuickStatCard 
          title="Woda" 
          current={dailyGoals.water.current} 
          target={dailyGoals.water.target} 
          unit="L" 
          color="bg-cyan-500" 
        />
      </div>
      
      {/* Quick Actions and Journal Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions */}
        <Card className="lg:col-span-1 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Szybkie Akcje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" asChild>
              <Link to="/journal">
                <Plus className="h-4 w-4 mr-2" /> Dodaj Posiłek
              </Link>
            </Button>
            <Button variant="outline" className="w-full">
              <Droplet className="h-4 w-4 mr-2" /> Zapisz 0.5L Wody
            </Button>
            <Button variant="outline" className="w-full">
              <Activity className="h-4 w-4 mr-2" /> Zapisz Pomiar Wagi
            </Button>
            <Button variant="secondary" className="w-full">
              <Utensils className="h-4 w-4 mr-2" /> Skopiuj Wczorajszy Dzień
            </Button>
          </CardContent>
        </Card>

        {/* Journal Preview */}
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Ostatnie Wpisy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Śniadanie: Płatki owsiane (80g)</span>
                <span className="text-primary font-bold">311 kcal</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Obiad: Kurczak z ryżem (250g)</span>
                <span className="text-primary font-bold">377 kcal</span>
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                <Link to="/journal" className="underline hover:text-primary">Zobacz cały dziennik</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;