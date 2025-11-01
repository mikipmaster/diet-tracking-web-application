import React from "react";

const Journal = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dziennik Posiłków</h1>
      <p className="text-lg text-muted-foreground">
        Śledź swoje posiłki, dodawaj produkty i przepisy.
      </p>
      
      {/* Placeholder for date picker and meal list */}
      <div className="p-6 border rounded-lg bg-card shadow-sm h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">Lista posiłków na wybrany dzień.</p>
      </div>
    </div>
  );
};

export default Journal;