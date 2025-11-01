import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/profile/ThemeToggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Profil i Ustawienia</h1>
      <p className="text-lg text-muted-foreground">
        Zarządzaj swoimi danymi, celami i preferencjami.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Form Placeholder */}
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Dane Osobowe</CardTitle>
            <CardDescription>Zaktualizuj swoje imię, wagę i cele.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Imię</Label>
                <Input id="name" defaultValue="Jan Kowalski" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="test@fitmajster.app" disabled />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Waga (kg)</Label>
                <Input id="weight" type="number" defaultValue={83.1} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Wzrost (cm)</Label>
                <Input id="height" type="number" defaultValue={180} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Wiek</Label>
                <Input id="age" type="number" defaultValue={30} />
              </div>
            </div>
            <Button className="mt-4">Zapisz Zmiany</Button>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card className="lg:col-span-1 shadow-md">
          <CardHeader>
            <CardTitle>Ustawienia Aplikacji</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Motyw (Jasny/Ciemny)</Label>
              <ThemeToggle />
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <Label>Jednostki</Label>
              <span className="text-sm text-muted-foreground">Metryczne</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;