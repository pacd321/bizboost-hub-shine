import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddProductForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "",
    inStock: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleStockToggle = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, inStock: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would save to Supabase
    console.log("Product data to save:", formData);
    
    toast({
      title: "Product Added",
      description: "Your product has been successfully added.",
    });
    
    // Reset form
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      imageUrl: "",
      inStock: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
          type="number"
          step="0.01"
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Switch
          id="inStock"
          checked={formData.inStock}
          onCheckedChange={handleStockToggle}
        />
        <Label htmlFor="inStock">In Stock</Label>
      </div>
      
      <Button type="submit" className="w-full">Add Product</Button>
    </form>
  );
};

export default AddProductForm;