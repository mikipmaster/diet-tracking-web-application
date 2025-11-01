import React from "react";
import { Plan } from "@/lib/plan-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Edit, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  plan: Plan;
}

const goalMap = {
  reduction: { label: "Redukcja", color: "bg-red-500 hover:bg-red-600" },
  mass: { label: "Masa", color: "bg-green-500 hover:bg-green-600" },
  maintenance: { label: "Utrzymanie", color: "bg-blue-500 hover:bg-blue-600" },
};

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const goalInfo = goalMap[plan.goal];

  return (
    <Card className={cn("shadow-lg transition-all duration-300", plan.isActive ? "border-primary ring-2 ring-primary/50" : "hover:shadow-xl")}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{plan.name}</CardTitle>
          <Badge className={cn("text-white", goalInfo.color)}>{goalInfo.label}</Badge>
        </div>
        <CardDescription className="mt-2">
          {plan.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium flex items-center"><Zap className="h-4 w-4 mr-1 text-primary" /> Kalorie:</span>
          <span className="font-bold">{plan.kcalTarget} kcal/dzień</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium">Czas trwania:</span>
          <span>{plan.durationDays} dni</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {plan.isActive ? (
          <Badge variant="default" className="bg-green-500 text-white">
            <CheckCircle className="h-4 w-4 mr-1" /> Aktywny
          </Badge>
        ) : (
          <Button variant="secondary" size="sm">
            Aktywuj Plan <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4 text-muted-foreground" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;