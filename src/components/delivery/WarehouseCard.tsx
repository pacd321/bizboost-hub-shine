
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Warehouse as WarehouseIcon, Edit, Trash } from 'lucide-react';
import { Warehouse } from '@/types';

interface WarehouseCardProps {
  warehouse: Warehouse;
  onEdit: (warehouse: Warehouse) => void;
  onDelete: (warehouse: Warehouse) => void;
}

export function WarehouseCard({ warehouse, onEdit, onDelete }: WarehouseCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{warehouse.name}</CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <WarehouseIcon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Address:</span>
            <p>{warehouse.address}</p>
            <p>{warehouse.city}, {warehouse.state} {warehouse.pincode}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Manager:</span>
            <p>{warehouse.manager || 'Not assigned'}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Contact:</span>
            <p>{warehouse.contact || 'N/A'}</p>
          </div>
          
          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(warehouse)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600 hover:bg-red-50" 
              onClick={() => onDelete(warehouse)}
            >
              <Trash className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
