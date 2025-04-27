
import React, { useState } from 'react';
import { mockProducts } from '../../data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/currency';
import { Eye, Edit, Trash, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function WebsiteProducts() {
  const [products, setProducts] = useState([...mockProducts]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Filtered products based on search term
  const filteredProducts = products.filter(
    product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleEditProduct = (product: Product) => {
    setEditProduct({...product});
    setIsDialogOpen(true);
  };
  
  const handleSaveProduct = () => {
    if (editProduct) {
      const newProducts = products.map(p => 
        p.id === editProduct.id ? editProduct : p
      );
      setProducts(newProducts);
      setIsDialogOpen(false);
      toast({
        title: "Product Updated",
        description: `${editProduct.name} has been updated successfully.`,
      });
    }
  };
  
  const handleDeleteProduct = (id: string) => {
    const newProducts = products.filter(p => p.id !== id);
    setProducts(newProducts);
    toast({
      title: "Product Removed",
      description: "The product has been removed from your website.",
    });
  };
  
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Product) => {
    if (editProduct) {
      setEditProduct({
        ...editProduct,
        [field]: e.target.value
      });
    }
  };
  
  const handleVisibilityToggle = (id: string, visible: boolean) => {
    const newProducts = products.map(p => 
      p.id === id ? { ...p, visible } : p
    );
    setProducts(newProducts);
    toast({
      title: visible ? "Product Visible" : "Product Hidden",
      description: visible 
        ? "The product is now visible on your website." 
        : "The product has been hidden from your website.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button>
          Add New Product
        </Button>
      </div>
      
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Name</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Price</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Category</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Stock</th>
              <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground">Visible</th>
              <th className="text-center py-3 px-4 text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-muted/50">
                <td className="py-3 px-4">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{product.description}</div>
                </td>
                <td className="py-3 px-4">{formatCurrency(product.price)}</td>
                <td className="py-3 px-4">
                  <Badge variant="secondary">{product.category}</Badge>
                </td>
                <td className="py-3 px-4">
                  {product.stock > 0 ? (
                    <span className="text-green-600">{product.stock}</span>
                  ) : (
                    <span className="text-red-600">Out of stock</span>
                  )}
                </td>
                <td className="py-3 px-4 text-center">
                  <Switch 
                    checked={product.visible !== false}
                    onCheckedChange={(checked) => handleVisibilityToggle(product.id, checked)}
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => window.open(`/website/product/${product.id}`, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          
          {editProduct && (
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={editProduct.name} 
                  onChange={(e) => handleFieldChange(e, 'name')}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  value={editProduct.description} 
                  onChange={(e) => handleFieldChange(e, 'description')}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    value={editProduct.price} 
                    onChange={(e) => handleFieldChange(e, 'price')}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input 
                    id="stock" 
                    type="number" 
                    value={editProduct.stock} 
                    onChange={(e) => handleFieldChange(e, 'stock')}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  value={editProduct.category} 
                  onChange={(e) => handleFieldChange(e, 'category')}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              
              <Button onClick={handleSaveProduct}>
                <Check className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
