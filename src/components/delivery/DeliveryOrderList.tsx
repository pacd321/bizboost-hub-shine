
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DeliveryOrder } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface DeliveryOrderListProps {
  orders: DeliveryOrder[];
  onUpdateStatus?: (orderId: string, status: string) => void;
}

export function DeliveryOrderList({ orders, onUpdateStatus }: DeliveryOrderListProps) {
  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string, label: string }> = {
      'pending': { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
      'processing': { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Processing' },
      'dispatched': { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Dispatched' },
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

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    if (onUpdateStatus) {
      onUpdateStatus(orderId, newStatus);
    } else {
      toast({
        title: "Status Updated",
        description: `Order ${orderId} status changed to ${newStatus}`
      });
    }
  };

  return (
    <div className="space-y-4">
      {orders.length > 0 ? (
        orders.map((order) => (
          <Card key={order.id} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-lg">Order #{order.orderId}</h3>
                <p className="text-sm text-muted-foreground">
                  Created on {new Date(order.createdAt).toLocaleDateString('en-IN')}
                </p>
              </div>
              {getStatusBadge(order.status)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Delivery Details</h4>
                <p className="text-sm">
                  {order.customer.name}<br />
                  {order.customer.address}<br />
                  {order.customer.city}, {order.customer.state} {order.customer.pincode}
                </p>
                <p className="text-sm mt-2">{order.customer.phone}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Order Items</h4>
                <ul className="text-sm space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity}x {item.productName}
                    </li>
                  ))}
                </ul>
                {order.trackingNumber && (
                  <p className="text-sm mt-2">
                    <span className="font-medium">Tracking: </span>
                    {order.trackingNumber} ({order.deliveryPartner})
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              {order.status === 'pending' && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleUpdateStatus(order.id, 'processing')}
                  >
                    Mark as Processing
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600" 
                    onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                  >
                    Cancel
                  </Button>
                </>
              )}

              {order.status === 'processing' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleUpdateStatus(order.id, 'dispatched')}
                >
                  Mark as Dispatched
                </Button>
              )}

              {order.status === 'dispatched' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleUpdateStatus(order.id, 'delivered')}
                >
                  Mark as Delivered
                </Button>
              )}

              <Button 
                variant="outline" 
                size="sm"
              >
                View Details
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <Card>
          <div className="p-6 text-center">
            <p className="text-muted-foreground">No delivery orders found.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
