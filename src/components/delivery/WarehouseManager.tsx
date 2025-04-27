
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Warehouse, StockMovement } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Warehouse as WarehouseIcon, Plus, ArrowRight } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { WarehouseForm } from './WarehouseForm';
import { WarehouseCard } from './WarehouseCard';

interface WarehouseManagerProps {
  warehouses: Warehouse[];
  stockMovements: StockMovement[];
}

export function WarehouseManager({ warehouses: initialWarehouses, stockMovements }: WarehouseManagerProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('warehouses');
  const [isAddingWarehouse, setIsAddingWarehouse] = useState(false);
  const [isEditingWarehouse, setIsEditingWarehouse] = useState(false);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [warehouseToDelete, setWarehouseToDelete] = useState<Warehouse | null>(null);
  const [warehouses, setWarehouses] = useState<Warehouse[]>(initialWarehouses);

  const handleAddWarehouse = (newWarehouse: Warehouse) => {
    setWarehouses(prev => [...prev, newWarehouse]);
    setIsAddingWarehouse(false);
  };

  const handleEditWarehouse = (editedWarehouse: Warehouse) => {
    setWarehouses(prev => 
      prev.map(w => w.id === editedWarehouse.id ? editedWarehouse : w)
    );
    setIsEditingWarehouse(false);
    setCurrentWarehouse(null);
  };

  const openDeleteDialog = (warehouse: Warehouse) => {
    setWarehouseToDelete(warehouse);
    setDeleteDialogOpen(true);
  };

  const handleDeleteWarehouse = () => {
    if (!warehouseToDelete) return;
    
    setWarehouses(prev => prev.filter(w => w.id !== warehouseToDelete.id));
    
    toast({
      title: "Warehouse Removed",
      description: `${warehouseToDelete.name} has been removed successfully.`
    });
    
    setDeleteDialogOpen(false);
    setWarehouseToDelete(null);
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
            <TabsTrigger value="transfers">Stock Transfers</TabsTrigger>
          </TabsList>
          
          {activeTab === 'warehouses' && !isAddingWarehouse && !isEditingWarehouse && (
            <Button onClick={() => setIsAddingWarehouse(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Warehouse
            </Button>
          )}
          
          {(isAddingWarehouse || isEditingWarehouse) && (
            <Button variant="outline" onClick={() => {
              setIsAddingWarehouse(false);
              setIsEditingWarehouse(false);
              setCurrentWarehouse(null);
            }}>
              Cancel
            </Button>
          )}
        </div>

        <TabsContent value="warehouses" className="space-y-4">
          {isAddingWarehouse ? (
            <Card>
              <CardHeader>
                <CardTitle>Add New Warehouse</CardTitle>
              </CardHeader>
              <CardContent>
                <WarehouseForm 
                  onSuccess={handleAddWarehouse} 
                  onCancel={() => setIsAddingWarehouse(false)}
                />
              </CardContent>
            </Card>
          ) : isEditingWarehouse && currentWarehouse ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit Warehouse</CardTitle>
              </CardHeader>
              <CardContent>
                <WarehouseForm 
                  initialData={currentWarehouse}
                  onSuccess={handleEditWarehouse} 
                  onCancel={() => {
                    setIsEditingWarehouse(false);
                    setCurrentWarehouse(null);
                  }}
                />
              </CardContent>
            </Card>
          ) : (
            <>
              {warehouses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {warehouses.map((warehouse) => (
                    <WarehouseCard
                      key={warehouse.id}
                      warehouse={warehouse}
                      onEdit={(warehouse) => {
                        setCurrentWarehouse(warehouse);
                        setIsEditingWarehouse(true);
                      }}
                      onDelete={openDeleteDialog}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <WarehouseIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Warehouses Yet</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Add your first warehouse to start managing inventory across locations.
                    </p>
                    <Button onClick={() => setIsAddingWarehouse(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Warehouse
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>
        
        <TabsContent value="transfers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Stock Movements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockMovements.length > 0 ? (
                  <div className="rounded-md border overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Product</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Movement</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Reason</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stockMovements.map((movement) => (
                          <tr key={movement.id}>
                            <td className="px-4 py-3 text-sm">
                              {new Date(movement.date).toLocaleDateString('en-IN')}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <div>
                                <div className="font-medium">{movement.product.name}</div>
                                <div className="text-muted-foreground text-xs">{movement.product.sku}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex items-center">
                                {movement.fromWarehouseId === null ? (
                                  <span className="text-green-600">New Stock</span>
                                ) : (
                                  <>
                                    <span className="text-gray-600">W{movement.fromWarehouseId}</span>
                                    <ArrowRight className="h-4 w-4 mx-1 text-gray-400" />
                                    <span className="text-gray-600">W{movement.toWarehouseId}</span>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-right font-medium">{movement.quantity}</td>
                            <td className="px-4 py-3 text-sm">{movement.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No stock movements recorded</p>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button>Record Stock Movement</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Warehouse</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {warehouseToDelete?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteWarehouse}
              className="bg-red-600 hover:bg-red-700"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
