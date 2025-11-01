import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Pulpit FitMajster</h1>
      <p className="text-lg text-muted-foreground">
        Witaj z powrotem! Tutaj znajdziesz podsumowanie dzisiejszych celów i szybkie akcje.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for quick stats/cards */}
        <div className="p-6 border rounded-lg bg-card shadow-sm">
          <h3 className="font-semibold text-xl">Kalorie Dzisiaj</h3>
          <p className="text-3xl mt-2 font-bold text-primary">1500 / 2200 kcal</p>
        </div>
        <div className="p-6 border rounded-lg bg-card shadow-sm">
          <h3 className="font-semibold text-xl">Białko</h3>
          <p className="text-3xl mt-2 font-bold">80 / 150 g</p>
        </div>
        <div className="p-6 border rounded-lg bg-card shadow-sm">
          <h3 className="font-semibold text-xl">Woda</h3>
          <p className="text-3xl mt-2 font-bold">1.2 / 3.0 L</p>
        </div>
      </div>
      
      {/* Placeholder for quick actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Dziennik Posiłków</h2>
        <div className="p-6 border rounded-lg bg-card shadow-sm h-64 flex items-center justify-center">
          <p className="text-muted-foreground">Podgląd dzisiejszych posiłków.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;