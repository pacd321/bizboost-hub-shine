import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Product } from '@/types';
import { Upload } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface AddProductFormProps {
  onSuccess?: () => void;
  product?: Product;
}

export function AddProductForm({ onSuccess, product }: AddProductFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    cost: '',
    stock: '',
    description: '',
    imageUrl: ''
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price.toString(),
        cost: product.cost.toString(),
        stock: product.stock.toString(),
        description: product.description || '',
        imageUrl: product.imageUrl || ''
      });
      if (product.imageUrl) {
        setImagePreview(product.imageUrl);
      }
    }
  }, [product]);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, imageUrl: url });
    setImagePreview(url);
  };

  const syncProductsToWebsite = (updatedProducts: Product[]) => {
    // Get current website products
    const websiteProducts = JSON.parse(localStorage.getItem('websiteProducts') || '[]');
    
    // Update website products with inventory changes
    const syncedProducts = updatedProducts.map(product => ({
      ...product,
      hidden: false, // Ensure products are visible on website by default
      imageUrl: product.imageUrl || '/placeholder-product.jpg', // Add default image if none exists
      inStock: product.stock > 0, // Add inStock property for website
    }));

    // Save to website products storage
    localStorage.setItem('websiteProducts', JSON.stringify(syncedProducts));
    
    // Trigger storage event to notify website components
    window.dispatchEvent(new Event('storage'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get current products
    const currentProducts = JSON.parse(localStorage.getItem('products') || '[]');
    
    const newProduct: Product = {
      id: product?.id || Math.random().toString(36).substr(2, 9),
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      price: parseFloat(formData.price),
      cost: parseFloat(formData.cost),
      stock: parseInt(formData.stock),
      description: formData.description,
      imageUrl: formData.imageUrl || '/placeholder-product.jpg',
      hidden: false,
      inStock: parseInt(formData.stock) > 0
    };

    let updatedProducts;
    if (product) {
      // Update existing product
      updatedProducts = currentProducts.map((p: Product) => 
        p.id === product.id ? newProduct : p
      );
    } else {
      // Add new product
      updatedProducts = [...currentProducts, newProduct];
    }

    // Update both inventory and website products
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    syncProductsToWebsite(updatedProducts);

    toast({
      title: product ? "Product Updated" : "Product Added",
      description: product 
        ? `${newProduct.name} has been updated.` 
        : `${newProduct.name} has been added to inventory and website.`
    });

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cost">Cost</Label>
          <Input
            id="cost"
            type="number"
            step="0.01"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <div className="flex gap-2">
          <Input
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleImageUrlChange}
            placeholder="https://example.com/image.jpg"
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => {
              const url = prompt('Enter image URL:');
              if (url) {
                handleImageUrlChange({ target: { value: url } } as any);
              }
            }}
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>
        {imagePreview && (
          <div className="mt-2">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-32 h-32 object-cover rounded-md border"
              onError={() => setImagePreview('/placeholder-product.jpg')}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full">
        {product ? 'Update Product' : 'Add Product'}
      </Button>
    </form>
  );
}
