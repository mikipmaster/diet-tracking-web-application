import React from "react";

const Plans = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Plany Żywieniowe</h1>
      <p className="text-lg text-muted-foreground">
        Zarządzaj swoimi planami dietetycznymi i generuj nowe.
      </p>
      
      {/* Placeholder for plan list and creator button */}
      <div className="p-6 border rounded-lg bg-card shadow-sm h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">Lista dostępnych planów.</p>
      </div>
    </div>
  );
};

export default Plans;