
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Static category data
const CATEGORIES = [
  { id: 1, name: "Fashion", description: "Clothing, shoes, and accessories" },
  { id: 2, name: "Electronics", description: "Phones, laptops, and gadgets" },
  { id: 3, name: "Home", description: "Furniture, decor, and kitchen appliances" },
  { id: 4, name: "Beauty", description: "Makeup, skincare, and personal care" },
  { id: 5, name: "Books", description: "Fiction, non-fiction, and educational" }
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[0].name.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Shop by Categories</h1>
        
        <Tabs 
          defaultValue={selectedCategory} 
          onValueChange={(value) => setSelectedCategory(value)}
          className="w-full"
        >
          <TabsList className="w-full overflow-x-auto flex flex-nowrap mb-6">
            {CATEGORIES.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.name.toLowerCase()}
                className="min-w-[100px]"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {CATEGORIES.map(category => (
            <TabsContent key={category.id} value={category.name.toLowerCase()}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-marketplace-primary">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Explore our {category.name.toLowerCase()} collection:</p>
                </CardContent>
              </Card>
              
              {/* Products specific to this category */}
              <ProductGrid category={category.name.toLowerCase()} />
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Categories;
