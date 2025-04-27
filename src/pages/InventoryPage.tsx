
import React, { useState } from 'react';
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

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setEditProductOpen(true);
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
            <AddProductForm 
              onSuccess={() => {
                setActiveTab('products');
                toast({
                  title: "Product Added",
                  description: "Your new product has been added to inventory."
                });
              }} 
            />
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
                onSuccess={() => {
                  setEditProductOpen(false);
                  toast({
                    title: "Product Updated",
                    description: `${currentProduct.name} has been updated.`
                  });
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default InventoryPage;
