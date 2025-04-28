import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/currency';
import { exportToCSV } from '@/lib/export';
import { Download, Eye, Filter, Package, PackageOpen, Search } from 'lucide-react';
import { useState } from 'react';

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
    phone: string;
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
  onOrdersChange?: (orders: Order[]) => void;
}

export function MarketplaceOrders({ orders, onOrdersChange }: MarketplaceOrdersProps) {
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
    if (!selectedOrder) return;

    // Update order status in localStorage
    const updatedOrders = orders.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    );
    
    // Update localStorage
    localStorage.setItem('bizboost_orders', JSON.stringify(updatedOrders));
    
    // Notify parent component
    if (onOrdersChange) {
      onOrdersChange(updatedOrders);
    }
    
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

  const handleExport = () => {
    const exportData = filteredOrders.map(order => ({
      'Order ID': order.orderId,
      'Customer Name': order.customer.name,
      'Customer Email': order.customer.email,
      'Order Date': new Date(order.createdAt).toLocaleDateString('en-IN'),
      'Total Amount': formatCurrency(order.totalAmount),
      'Status': order.status.charAt(0).toUpperCase() + order.status.slice(1),
      'Payment Method': order.paymentMethod,
      'Items': order.items.map(item => 
        `${item.productName} (${item.quantity}x)`
      ).join('; '),
      'Shipping Address': `${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.pincode}`
    }));

    exportToCSV(exportData, 'orders');
    toast({
      title: "Export Successful",
      description: "Your orders have been exported to CSV."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders by ID, customer, or status..."
            className="pl-9 w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Total Orders</span>
            <span className="text-2xl font-bold">{orders.length}</span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Pending</span>
            <span className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'pending').length}
            </span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Processing</span>
            <span className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'processing').length}
            </span>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Completed</span>
            <span className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'delivered').length}
            </span>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="rounded-md border overflow-hidden">
          <table className="w-full divide-y">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground">Date</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-muted-foreground">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">#{order.orderId}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{order.customer.name}</span>
                        <span className="text-xs text-muted-foreground">{order.customer.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-medium">{formatCurrency(order.totalAmount)}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleViewOrder(order)}
                        className="hover:bg-primary/10"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">No orders found</p>
                      <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      
      <Dialog open={viewOrderOpen} onOpenChange={setViewOrderOpen}>
        {selectedOrder && (
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>Order #{selectedOrder.orderId}</span>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(selectedOrder.createdAt).toLocaleDateString('en-IN')}
                </span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <Card className="p-4">
                <h4 className="font-medium mb-3">Customer Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{selectedOrder.customer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{selectedOrder.customer.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium">{selectedOrder.customer.phone}</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-muted-foreground block mb-1">Address</span>
                    <span className="font-medium">
                      {selectedOrder.customer.address}<br />
                      {selectedOrder.customer.city}, {selectedOrder.customer.state} {selectedOrder.customer.pincode}
                    </span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-medium mb-3">Order Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-medium capitalize">{selectedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Date</span>
                    <span className="font-medium">
                      {new Date(selectedOrder.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Amount</span>
                    <span className="font-medium text-lg">{formatCurrency(selectedOrder.totalAmount)}</span>
                  </div>
                  {selectedOrder.notes && (
                    <div className="mt-4">
                      <span className="text-muted-foreground block mb-1">Notes</span>
                      <span className="font-medium">{selectedOrder.notes}</span>
                    </div>
                  )}
                </div>
              </Card>
            </div>
            
            <Card className="p-4">
              <h4 className="font-medium mb-3">Order Items</h4>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium">Product</th>
                      <th className="px-4 py-3 text-center text-xs font-medium">Quantity</th>
                      <th className="px-4 py-3 text-right text-xs font-medium">Price</th>
                      <th className="px-4 py-3 text-right text-xs font-medium">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {selectedOrder.items.map((item) => (
                      <tr key={item.productId} className="hover:bg-muted/50">
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-medium">{item.productName}</span>
                            <span className="text-xs text-muted-foreground">SKU: {item.productId}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">{item.quantity}</td>
                        <td className="px-4 py-3 text-right">{formatCurrency(item.price)}</td>
                        <td className="px-4 py-3 text-right font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            
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
