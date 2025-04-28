import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Upload, Plus, Search, FileSpreadsheet, Trash2, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import AddProductForm from "@/components/dashboard/AddProductForm";
import { parseCSV, type ProductData } from "@/utils/csvParser";

const initialProducts = [
];

const ProductsManage = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
  }, []);

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const newProducts = parseCSV(text);
        
        const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
        const mergedProducts = [...existingProducts];
        
        newProducts.forEach(newProduct => {
          const existingIndex = mergedProducts.findIndex(p => p.name === newProduct.name);
          if (existingIndex >= 0) {
            mergedProducts[existingIndex] = { ...newProduct, id: mergedProducts[existingIndex].id };
          } else {
            mergedProducts.push({ ...newProduct, id: Math.max(0, ...mergedProducts.map(p => p.id)) + 1 });
          }
        });

        localStorage.setItem('products', JSON.stringify(mergedProducts));
        setProducts(mergedProducts);
        
        window.dispatchEvent(new Event('storage'));
        
        toast({
          title: "Products Imported",
          description: `Successfully imported ${newProducts.length} products.`,
        });
      } catch (error) {
        console.error('Error parsing CSV:', error);
        toast({
          title: "Import Failed",
          description: "Failed to import products. Please check your CSV format.",
          variant: "destructive",
        });
      }
    };

    reader.readAsText(file);
  };

  const toggleProductVisibility = (productId: number) => {
    const updatedProducts = products.map(product => 
      product.id === productId ? { ...product, hidden: !product.hidden } : product
    );
    
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "Product Updated",
      description: "Product visibility has been updated.",
    });
  };

  const handleDeleteProduct = (productId: number) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "Product Deleted",
      description: "Product has been removed from inventory.",
    });
  };

  const handleEditProduct = (productId: number) => {
    toast({
      title: "Edit Product",
      description: "Product editing will be implemented soon.",
    });
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-gray-500 mt-1">
            Manage your product catalog.
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Enter the details for your new product.
                </DialogDescription>
              </DialogHeader>
              <AddProductForm />
            </DialogContent>
          </Dialog>
          
          <Button variant="outline">
            <label className="flex items-center cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleCSVUpload}
              />
            </label>
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>CSV Import Instructions</CardTitle>
          <CardDescription>
            Follow these guidelines for successful product imports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <FileSpreadsheet className="h-8 w-8 text-blue-500 mr-2" />
            <div>
              <h3 className="font-medium">CSV Format</h3>
              <p className="text-sm text-gray-500">
                Your CSV file should include columns for: name, price, description, category, imageUrl, inStock
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Download Template
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <CardTitle>Product Inventory</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={!product.hidden}
                          onCheckedChange={() => toggleProductVisibility(product.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      No products found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ProductsManage;