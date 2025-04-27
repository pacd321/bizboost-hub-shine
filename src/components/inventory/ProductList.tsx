
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/currency';
import { Edit, MoreHorizontal, Download, Upload, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductListProps {
  products: Product[];
  onEdit?: (product: Product) => void;
}

export function ProductList({ products, onEdit }: ProductListProps) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    toast({
      title: "Export Initiated",
      description: "Your product data is being exported to CSV."
    });
    // In a real app, this would trigger the CSV download
  };

  const handleImport = () => {
    // In a real app, this would open a file input dialog
    document.getElementById('import-file')?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded and is being processed.`
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handleImport}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <input 
            id="import-file" 
            type="file" 
            accept=".csv,.xlsx,.xls" 
            className="hidden" 
            onChange={handleFileUpload} 
          />
        </div>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full divide-y">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">SKU</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Category</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Price</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Cost</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Stock</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">{product.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{product.sku}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{product.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-right">{formatCurrency(product.price)}</td>
                    <td className="py-3 px-4 text-sm text-right">{formatCurrency(product.cost)}</td>
                    <td className="py-3 px-4 text-sm text-right">{product.stock}</td>
                    <td className="py-3 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit && onEdit(product)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-muted-foreground">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
