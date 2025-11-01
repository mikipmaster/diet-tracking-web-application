import React from "react";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analityka i Postępy</h1>
      <p className="text-lg text-muted-foreground">
        Przeglądaj wykresy trendów wagi, makroskładników i kalorii.
      </p>
      
      {/* Placeholder for charts */}
      <div className="p-6 border rounded-lg bg-card shadow-sm h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">Wykresy postępów.</p>
      </div>
    </div>
  );
};

export default Analytics;