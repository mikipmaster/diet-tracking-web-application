import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_MACRO_DATA, MacroDataPoint } from "@/lib/analytics-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MacroChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tygodniowe Spożycie Makroskładników (g)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MOCK_MACRO_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" stroke="hsl(var(--foreground))" tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--foreground))" tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
            />
            <Legend />
            <Bar dataKey="protein" fill="#3b82f6" name="Białko" />
            <Bar dataKey="carbs" fill="#f59e0b" name="Węglowodany" />
            <Bar dataKey="fat" fill="#ef4444" name="Tłuszcze" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MacroChart;