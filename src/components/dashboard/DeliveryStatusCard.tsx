
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DeliveryOrder } from '@/types';

interface DeliveryStatusCardProps {
  deliveries: DeliveryOrder[];
}

export function DeliveryStatusCard({ deliveries }: DeliveryStatusCardProps) {
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

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Deliveries</CardTitle>
        <CardDescription>Status of your recent orders</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0 divide-y">
          {deliveries.map((delivery) => (
            <div key={delivery.id} className="p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order #{delivery.orderId}</span>
                {getStatusBadge(delivery.status)}
              </div>
              <div className="mt-1">
                <span className="text-sm">
                  {delivery.items.map(item => `${item.quantity}x ${item.productName}`).join(", ")}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                <span>To: {delivery.customer.name}, {delivery.customer.city}</span>
                <span>Created: {new Date(delivery.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-3 pb-4 flex justify-center">
        <a href="/delivery" className="text-sm text-primary hover:underline">
          View all deliveries
        </a>
      </CardFooter>
    </Card>
  );
}
