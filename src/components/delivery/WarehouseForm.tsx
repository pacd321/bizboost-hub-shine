
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Warehouse } from '@/types';

interface WarehouseFormProps {
  onSuccess: (warehouse: Warehouse) => void;
  onCancel: () => void;
  initialData?: Warehouse;
}

export function WarehouseForm({ onSuccess, onCancel, initialData }: WarehouseFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    pincode: initialData?.pincode || '',
    manager: initialData?.manager || '',
    contact: initialData?.contact || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate form
    if (!formData.name || !formData.address || !formData.city) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    
    // Create a new warehouse object
    const warehouseData: Warehouse = {
      id: initialData?.id || `wh-${Date.now()}`,
      name: formData.name,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      manager: formData.manager,
      contact: formData.contact
    };
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: initialData ? "Warehouse Updated" : "Warehouse Added",
        description: `${formData.name} has been ${initialData ? 'updated' : 'added'} successfully.`
      });
      
      onSuccess(warehouseData);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Warehouse Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter warehouse name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="manager">Manager Name</Label>
          <Input
            id="manager"
            name="manager"
            value={formData.manager}
            onChange={handleChange}
            placeholder="Enter manager name"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
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
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter pincode"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contact">Contact Number</Label>
        <Input
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Enter contact number"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (initialData ? 'Updating...' : 'Adding...') : (initialData ? 'Update Warehouse' : 'Add Warehouse')}
        </Button>
      </div>
    </form>
  );
}
