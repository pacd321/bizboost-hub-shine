
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Warehouse, StockMovement } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Warehouse as WarehouseIcon, ArrowRight } from 'lucide-react';

interface WarehouseManagerProps {
  warehouses: Warehouse[];
  stockMovements: StockMovement[];
}

export function WarehouseManager({ warehouses, stockMovements }: WarehouseManagerProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('warehouses');
  const [isAddingWarehouse, setIsAddingWarehouse] = useState(false);
  const [warehouseForm, setWarehouseForm] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    manager: '',
    contact: ''
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWarehouseForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddWarehouse = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!warehouseForm.name || !warehouseForm.address || !warehouseForm.city) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call
    toast({
      title: "Warehouse Added",
      description: `${warehouseForm.name} has been added successfully.`
    });
    
    setIsAddingWarehouse(false);
    setWarehouseForm({
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      manager: '',
      contact: ''
    });
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
          <TabsTrigger value="transfers">Stock Transfers</TabsTrigger>
        </TabsList>
        
        {activeTab === 'warehouses' && !isAddingWarehouse && (
          <Button onClick={() => setIsAddingWarehouse(true)}>
            Add Warehouse
          </Button>
        )}
        
        {isAddingWarehouse && (
          <Button variant="outline" onClick={() => setIsAddingWarehouse(false)}>
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
              <form onSubmit={handleAddWarehouse} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Warehouse Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={warehouseForm.name}
                      onChange={handleFormChange}
                      placeholder="Enter warehouse name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="manager">Manager Name</Label>
                    <Input
                      id="manager"
                      name="manager"
                      value={warehouseForm.manager}
                      onChange={handleFormChange}
                      placeholder="Enter manager name"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={warehouseForm.address}
                    onChange={handleFormChange}
                    placeholder="Enter warehouse address"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={warehouseForm.city}
                      onChange={handleFormChange}
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={warehouseForm.state}
                      onChange={handleFormChange}
                      placeholder="Enter state"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={warehouseForm.pincode}
                      onChange={handleFormChange}
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={warehouseForm.contact}
                    onChange={handleFormChange}
                    placeholder="Enter contact number"
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsAddingWarehouse(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add Warehouse
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {warehouses.map((warehouse) => (
              <Card key={warehouse.id}>
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
                      <p>{warehouse.manager}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Contact:</span>
                      <p>{warehouse.contact}</p>
                    </div>
                    
                    <div className="pt-2 flex justify-end">
                      <Button variant="outline" size="sm">Manage Inventory</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
  );
}
