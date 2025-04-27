
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { parseIndianNumber, formatCurrency } from '@/lib/currency';
import { Product } from '@/types';

interface AddProductFormProps {
  onSuccess?: () => void;
  product?: Product;
}

export function AddProductForm({ onSuccess, product }: AddProductFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || '',
    price: product ? String(product.price) : '',
    cost: product ? String(product.cost) : '',
    stock: product ? String(product.stock) : '',
    sku: product?.sku || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // Create product object
    const productData: Product = {
      id: product?.id || `prod-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      cost: parseFloat(formData.cost) || 0,
      stock: parseInt(formData.stock) || 0,
      sku: formData.sku || `SKU-${Date.now()}`,
      createdAt: product?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: product ? "Product Updated" : "Product Added",
        description: `${formData.name} has been ${product ? 'updated' : 'added'} to your inventory.`
      });
      
      // Reset form
      if (!product) {
        setFormData({
          name: '',
          description: '',
          category: '',
          price: '',
          cost: '',
          stock: '',
          sku: '',
        });
      }

      if (onSuccess) {
        onSuccess();
      }
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Enter product SKU"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={handleSelectChange} required>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Apparel">Apparel</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Beauty">Beauty</SelectItem>
              <SelectItem value="Kitchenware">Kitchenware</SelectItem>
              <SelectItem value="Fitness">Fitness</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            className="currency-inr"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cost">Cost (₹)</Label>
          <Input
            id="cost"
            name="cost"
            type="text"
            value={formData.cost}
            onChange={handleChange}
            placeholder="0.00"
            className="currency-inr"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stock">Stock Quantity *</Label>
        <Input
          id="stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Enter stock quantity"
          min="0"
          required
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? (product ? 'Updating Product...' : 'Adding Product...') : (product ? 'Update Product' : 'Add Product')}
        </Button>
      </div>
    </form>
  );
}
