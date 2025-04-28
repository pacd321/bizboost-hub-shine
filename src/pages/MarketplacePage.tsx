import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/lib/storage';
import { ExternalLink, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { MarketplaceAnalytics } from '../components/marketplace/MarketplaceAnalytics';
import { MarketplaceOrders } from '../components/marketplace/MarketplaceOrders';
import { MarketplaceSettings } from '../components/marketplace/MarketplaceSettings';

const MarketplacePage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = storage.getOrders();
    setOrders(storedOrders);
  }, []);

  const handlePreview = () => {
    // Open the storefront in a new tab
    window.open('/storefront', '_blank');
  };
  
  const handleActivateStorefront = () => {
    toast({
      title: "Storefront Activated",
      description: "Your online store is now live and accessible to customers."
    });
  };

  const handleOrdersChange = (updatedOrders: any[]) => {
    setOrders(updatedOrders);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <div className="flex gap-2">
            <Button onClick={handlePreview} variant="outline">
              <Globe className="h-4 w-4 mr-2" />
              Preview Store
            </Button>
            <Button onClick={handleActivateStorefront}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Activate Store
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Store Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage and process customer orders from your online store</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketplaceOrders orders={orders} onOrdersChange={handleOrdersChange} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <MarketplaceAnalytics />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
                <CardDescription>Configure your online storefront appearance and behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketplaceSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MarketplacePage;
