
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import React, { useState } from 'react';

export function MarketplaceSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    storeName: 'StartKaroShop',
    logo: '',
    storeDescription: 'Quality products for businesses and individuals. Fast delivery, excellent customer service.',
    currency: 'INR',
    taxRate: '18',
    enablePayments: {
      cod: true,
      upi: true,
      cards: true
    },
    enableNotifications: true,
    trackInventory: true
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: checked
        }
      }));
    } else {
      setSettings(prev => ({ ...prev, [name]: checked }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings Updated",
        description: "Your store settings have been updated successfully."
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">General Settings</h3>
        
        <div className="space-y-2">
          <Label htmlFor="storeName">Store Name</Label>
          <Input
            id="storeName"
            name="storeName"
            value={settings.storeName}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="logo">Logo URL</Label>
          <Input
            id="logo"
            name="logo"
            value={settings.logo}
            onChange={handleInputChange}
            placeholder="https://example.com/logo.png"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="storeDescription">Store Description</Label>
          <Textarea
            id="storeDescription"
            name="storeDescription"
            value={settings.storeDescription}
            onChange={handleInputChange}
            rows={4}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payment Settings</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select 
              value={settings.currency} 
              onValueChange={(value) => handleSelectChange('currency', value)}
            >
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                <SelectItem value="USD">US Dollar ($)</SelectItem>
                <SelectItem value="EUR">Euro (€)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <Input
              id="taxRate"
              name="taxRate"
              value={settings.taxRate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>Payment Methods</Label>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="codEnabled" className="cursor-pointer">Cash on Delivery</Label>
            <Switch
              id="codEnabled"
              checked={settings.enablePayments.cod}
              onCheckedChange={(checked) => handleSwitchChange('enablePayments.cod', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="upiEnabled" className="cursor-pointer">UPI Payment</Label>
            <Switch
              id="upiEnabled"
              checked={settings.enablePayments.upi}
              onCheckedChange={(checked) => handleSwitchChange('enablePayments.upi', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="cardsEnabled" className="cursor-pointer">Credit/Debit Cards</Label>
            <Switch
              id="cardsEnabled"
              checked={settings.enablePayments.cards}
              onCheckedChange={(checked) => handleSwitchChange('enablePayments.cards', checked)}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Store Features</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="enableNotifications" className="cursor-pointer">Customer Notifications</Label>
            <p className="text-sm text-muted-foreground">Send email notifications for orders</p>
          </div>
          <Switch
            id="enableNotifications"
            checked={settings.enableNotifications}
            onCheckedChange={(checked) => handleSwitchChange('enableNotifications', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="trackInventory" className="cursor-pointer">Inventory Tracking</Label>
            <p className="text-sm text-muted-foreground">Automatically update inventory when orders are placed</p>
          </div>
          <Switch
            id="trackInventory"
            checked={settings.trackInventory}
            onCheckedChange={(checked) => handleSwitchChange('trackInventory', checked)}
          />
        </div>
      </div>
      
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
