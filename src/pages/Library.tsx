import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Utensils, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FoodLibrary from "@/components/library/FoodLibrary";
import RecipeLibrary from "@/components/library/RecipeLibrary";

const Library = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Biblioteka Produktów i Przepisów</h1>
      <p className="text-lg text-muted-foreground">
        Zarządzaj swoimi ulubionymi produktami, potrawami i twórz nowe przepisy.
      </p>
      
      <Tabs defaultValue="foods" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <TabsList>
            <TabsTrigger value="foods">
              <Utensils className="h-4 w-4 mr-2" /> Produkty
            </TabsTrigger>
            <TabsTrigger value="recipes">
              <BookOpen className="h-4 w-4 mr-2" /> Przepisy
            </TabsTrigger>
          </TabsList>
          <div className="flex space-x-2 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Szukaj..." className="pl-9" />
            </div>
            <Button>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="foods" className="mt-6">
          <FoodLibrary />
        </TabsContent>
        <TabsContent value="recipes" className="mt-6">
          <RecipeLibrary />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Library;