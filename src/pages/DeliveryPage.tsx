import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/lib/storage';
import { DeliveryOrder } from '@/types';
import { useEffect, useState } from 'react';
import { DeliveryOrderList } from '../components/delivery/DeliveryOrderList';
import { WarehouseManager } from '../components/delivery/WarehouseManager';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { mockWarehouses } from '../data/mockData';

const DeliveryPage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrder[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load orders from localStorage
    const orders = storage.getOrders();
    setDeliveryOrders(orders);
  }, []);

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = deliveryOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus as any, updatedAt: new Date().toISOString() } : order
    );
    
    setDeliveryOrders(updatedOrders);
    
    // Update localStorage
    localStorage.setItem('bizboost_orders', JSON.stringify(updatedOrders));
    
    toast({
      title: "Status Updated",
      description: `Order status has been updated to ${newStatus}.`
    });
  };

  // Filter orders by status
  const pendingOrders = deliveryOrders.filter(o => o.status === 'pending');
  const processingOrders = deliveryOrders.filter(o => o.status === 'processing');
  const dispatchedOrders = deliveryOrders.filter(o => o.status === 'dispatched');
  const deliveredOrders = deliveryOrders.filter(o => o.status === 'delivered');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Delivery & Warehouse Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="text-lg font-bold text-yellow-600">{pendingOrders.length}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="text-lg font-bold text-blue-600">{processingOrders.length}</div>
                <div className="text-sm text-muted-foreground">Processing</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="text-lg font-bold text-purple-600">{dispatchedOrders.length}</div>
                <div className="text-sm text-muted-foreground">Dispatched</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="text-lg font-bold text-green-600">{deliveredOrders.length}</div>
                <div className="text-sm text-muted-foreground">Delivered</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Delivery Orders</TabsTrigger>
            <TabsTrigger value="warehouse">Warehouse Management</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Orders</CardTitle>
                <CardDescription>Manage and track your delivery orders</CardDescription>
              </CardHeader>
              <CardContent>
                <DeliveryOrderList 
                  orders={deliveryOrders} 
                  onUpdateStatus={handleUpdateStatus} 
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="warehouse" className="space-y-6">
            <WarehouseManager 
              warehouses={mockWarehouses}
              stockMovements={[]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DeliveryPage;
