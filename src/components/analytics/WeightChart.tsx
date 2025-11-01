import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_WEIGHT_DATA, WeightDataPoint } from "@/lib/analytics-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeightChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trend Wagi (kg)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_WEIGHT_DATA} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" stroke="hsl(var(--foreground))" tickLine={false} axisLine={false} />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="hsl(var(--foreground))" tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
              formatter={(value: number, name: string) => [`${value} kg`, name]}
            />
            <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeightChart;