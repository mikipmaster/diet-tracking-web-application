import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_PLANS } from "@/lib/plan-data";
import PlanCard from "@/components/plans/PlanCard";

const Plans = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Plany Żywieniowe</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Stwórz Nowy Plan
        </Button>
      </div>
      <p className="text-lg text-muted-foreground">
        Zarządzaj swoimi planami dietetycznymi i generuj nowe, dopasowane do Twoich celów.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Plans;