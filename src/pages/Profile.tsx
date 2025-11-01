import React from "react";

const Profile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profil i Ustawienia</h1>
      <p className="text-lg text-muted-foreground">
        Zarządzaj swoimi danymi, celami i preferencjami.
      </p>
      
      {/* Placeholder for profile form */}
      <div className="p-6 border rounded-lg bg-card shadow-sm h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">Formularz edycji profilu.</p>
      </div>
    </div>
  );
};

export default Profile;