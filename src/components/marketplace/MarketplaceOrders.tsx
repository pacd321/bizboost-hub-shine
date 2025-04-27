
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/currency';
import { Search, Eye, PackageOpen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
  warehouseId: string;
  notes?: string;
}

interface MarketplaceOrdersProps {
  orders: Order[];
}

export function MarketplaceOrders({ orders }: MarketplaceOrdersProps) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewOrderOpen, setViewOrderOpen] = useState(false);
  
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.orderId.toLowerCase().includes(searchLower) ||
      order.customer.name.toLowerCase().includes(searchLower) ||
      order.customer.email.toLowerCase().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower)
    );
  });
  
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewOrderOpen(true);
  };
  
  const handleUpdateStatus = (newStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => {
    // In a real implementation, this would update the order status in the database
    toast({
      title: "Status Updated",
      description: `Order status changed to ${newStatus}`
    });
    
    setViewOrderOpen(false);
    setSelectedOrder(null);
  };
  
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string, label: string }> = {
      'pending': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
      'processing': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Processing' },
      'shipped': { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Shipped' },
      'delivered': { color: 'bg-green-100 text-green-800 border-green-200', label: 'Delivered' },
      'cancelled': { color: 'bg-red-100 text-red-800 border-red-200', label: 'Cancelled' }
    };
    
    const statusInfo = statusMap[status] || { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Unknown' };
    
    return (
      <Badge variant="outline" className={statusInfo.color}>
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search orders..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <table className="w-full divide-y">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm font-medium">#{order.orderId}</td>
                  <td className="px-4 py-3 text-sm">
                    <div>{order.customer.name}</div>
                    <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <Dialog open={viewOrderOpen} onOpenChange={setViewOrderOpen}>
        {selectedOrder && (
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Order #{selectedOrder.orderId}</span>
                {getStatusBadge(selectedOrder.status)}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div>
                <h4 className="font-medium mb-2">Customer Information</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                  <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                  <p className="whitespace-pre-wrap">
                    <strong>Address:</strong><br />
                    {selectedOrder.customer.address}<br />
                    {selectedOrder.customer.city}, {selectedOrder.customer.state} {selectedOrder.customer.pincode}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Order Details</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                  <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString('en-IN')}</p>
                  <p><strong>Total Amount:</strong> {formatCurrency(selectedOrder.totalAmount)}</p>
                  {selectedOrder.notes && <p><strong>Notes:</strong> {selectedOrder.notes}</p>}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Order Items</h4>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium">Product</th>
                      <th className="px-4 py-2 text-center text-xs font-medium">Quantity</th>
                      <th className="px-4 py-2 text-right text-xs font-medium">Price</th>
                      <th className="px-4 py-2 text-right text-xs font-medium">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {selectedOrder.items.map((item) => (
                      <tr key={item.productId}>
                        <td className="px-4 py-2 text-sm">{item.productName}</td>
                        <td className="px-4 py-2 text-sm text-center">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-right">{formatCurrency(item.price)}</td>
                        <td className="px-4 py-2 text-sm text-right">
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-between">
              <div className="flex gap-2">
                <Button 
                  variant={selectedOrder.status === 'processing' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleUpdateStatus('processing')}
                >
                  <PackageOpen className="h-4 w-4 mr-1" />
                  Process
                </Button>
                <Button 
                  variant={selectedOrder.status === 'shipped' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleUpdateStatus('shipped')}
                >
                  Ship
                </Button>
                <Button 
                  variant={selectedOrder.status === 'delivered' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleUpdateStatus('delivered')}
                >
                  Deliver
                </Button>
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => handleUpdateStatus('cancelled')}
              >
                Cancel Order
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
