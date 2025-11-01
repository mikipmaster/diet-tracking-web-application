import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Nutrients } from "@/lib/data";

interface DailySummaryProps {
  summary: Nutrients;
  targets: Nutrients; // Mock targets for visualization
}

const DailySummary: React.FC<DailySummaryProps> = ({ summary, targets }) => {
  
  const MacroBar: React.FC<{ label: string; current: number; target: number; unit: string }> = ({ label, current, target, unit }) => {
    const percentage = target > 0 ? Math.min(100, (current / target) * 100) : 0;
    
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="font-medium">{label}</span>
          <span className="font-semibold">{current}{unit} / {target}{unit}</span>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>
    );
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Podsumowanie Dnia</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Calories */}
        <div className="space-y-1 border-b pb-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Kalorie</span>
            <span className="text-3xl font-bold text-primary">{summary.kcal} / {targets.kcal} kcal</span>
          </div>
          <Progress value={Math.min(100, (summary.kcal / targets.kcal) * 100)} className="h-3" />
        </div>

        {/* Macros */}
        <div className="space-y-3">
          <MacroBar label="Białko" current={summary.protein} target={targets.protein} unit="g" />
          <MacroBar label="Węglowodany" current={summary.carbs} target={targets.carbs} unit="g" />
          <MacroBar label="Tłuszcze" current={summary.fat} target={targets.fat} unit="g" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySummary;