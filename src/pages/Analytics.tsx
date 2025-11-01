import React from "react";
import WeightChart from "@/components/analytics/WeightChart";
import MacroChart from "@/components/analytics/MacroChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Analytics = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Analityka i Postępy</h1>
      <p className="text-lg text-muted-foreground">
        Przeglądaj wykresy trendów wagi, makroskładników i kalorii.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Średnie Kcal (7 dni)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">2214 kcal</p>
            <p className="text-sm text-muted-foreground mt-1">Cel: 2200 kcal</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Zmiana Wagi (Miesiąc)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-500">-2.4 kg</p>
            <p className="text-sm text-muted-foreground mt-1">Od 2024-09-01</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Najwyższe Białko</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-500">160 g</p>
            <p className="text-sm text-muted-foreground mt-1">W czwartek</p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="space-y-6">
        <WeightChart />
        <MacroChart />
      </div>
    </div>
  );
};

export default Analytics;