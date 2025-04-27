
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductList } from '../components/inventory/ProductList';
import { AddProductForm } from '../components/inventory/AddProductForm';
import { OCRUploader } from '../components/inventory/OCRUploader';
import { mockProducts } from '../data/mockData';
import { Product } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const InventoryPage = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [activeTab, setActiveTab] = useState('products');
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  
  // Check if user has completed onboarding
  const [onboardingCompleted, setOnboardingCompleted] = useState(() => {
    return localStorage.getItem('onboardingCompleted') === 'true';
  });

  useEffect(() => {
    // Save onboarding status to local storage
    if (onboardingCompleted) {
      localStorage.setItem('onboardingCompleted', 'true');
    }
  }, [onboardingCompleted]);

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setEditProductOpen(true);
  };

  const handleUpdateProduct = () => {
    // Here we would normally update the product in the database
    // For now, we'll just close the dialog and show a toast
    setEditProductOpen(false);
    toast({
      title: "Product Updated",
      description: currentProduct ? `${currentProduct.name} has been updated.` : "Product has been updated."
    });
    
    // Reset current product
    setCurrentProduct(null);
  };

  const handleAddProduct = () => {
    // Here we would normally add the product to the database
    setActiveTab('products');
    toast({
      title: "Product Added",
      description: "Your new product has been added to inventory."
    });
  };

  const handleOCRSuccess = (data: any) => {
    toast({
      title: "OCR Data Processed",
      description: `${data.items.length} items added to your inventory from the invoice.`
    });
    setActiveTab('products');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h1 className="text-3xl font-bold">Inventory Management</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="add">Add Manually</TabsTrigger>
              <TabsTrigger value="ocr">Add via OCR</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="products" className="space-y-4">
            <ProductList products={products} onEdit={handleEditProduct} />
          </TabsContent>

          <TabsContent value="add" className="max-w-3xl">
            <AddProductForm onSuccess={handleAddProduct} />
          </TabsContent>

          <TabsContent value="ocr" className="max-w-3xl mx-auto">
            <OCRUploader onSuccess={handleOCRSuccess} />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={editProductOpen} onOpenChange={setEditProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {currentProduct && (
              <AddProductForm 
                product={currentProduct}
                onSuccess={handleUpdateProduct}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default InventoryPage;
