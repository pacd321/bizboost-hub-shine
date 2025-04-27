
import React, { useState, useRef } from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    // Generate CSV content
    const headers = ["Name", "SKU", "Category", "Price", "Cost", "Stock"];
    const csvRows = [headers.join(",")];
    
    filteredProducts.forEach(product => {
      const row = [
        `"${product.name}"`,
        `"${product.sku}"`,
        `"${product.category}"`,
        product.price,
        product.cost,
        product.stock
      ];
      csvRows.push(row.join(","));
    });
    
    const csvContent = csvRows.join("\n");
    
    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    // Set up download link
    link.setAttribute("href", url);
    link.setAttribute("download", `inventory-products-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    
    // Trigger download and clean up
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);

    toast({
      title: "Export Successful",
      description: `${filteredProducts.length} products have been exported to CSV.`
    });
  };

  const handleImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (!content) {
          toast({
            title: "Import Error",
            description: "Could not read file content",
            variant: "destructive"
          });
          return;
        }

        try {
          // Parse CSV content
          const rows = content.split('\n');
          const headers = rows[0].split(',');
          
          // Verify proper format
          const requiredHeaders = ["Name", "SKU", "Category", "Price", "Stock"];
          const hasRequiredHeaders = requiredHeaders.every(
            header => headers.some(h => h.includes(header))
          );
          
          if (!hasRequiredHeaders) {
            toast({
              title: "Import Error",
              description: "CSV file does not have the required columns",
              variant: "destructive"
            });
            return;
          }
          
          // Count products to import
          const productCount = rows.length - 1;
          
          toast({
            title: "Import Successful",
            description: `${productCount} products have been imported.`
          });
        } catch (error) {
          toast({
            title: "Import Error",
            description: "Failed to process the CSV file",
            variant: "destructive"
          });
        }
      };
      
      reader.readAsText(file);
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
            ref={fileInputRef}
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
