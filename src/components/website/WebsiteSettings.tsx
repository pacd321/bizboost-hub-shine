
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export function WebsiteSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const { toast } = useToast();
  
  const [generalSettings, setGeneralSettings] = useState({
    websiteUrl: 'https://bizboostshop.com',
    timeZone: 'Asia/Kolkata',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    metaTitle: 'BizBoost Shop - Quality Products for Business',
    metaDescription: 'BizBoost Shop offers high-quality products for businesses at competitive prices. Shop our extensive catalog now.',
  });
  
  const [ecommerceSettings, setEcommerceSettings] = useState({
    enableCheckout: true,
    guestCheckout: true,
    vatPercentage: 18,
    minOrderValue: 500,
    shippingMethod: 'flat_rate',
    flatRateAmount: 100,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: true,
    orderCancelled: true,
    lowStock: true,
    newCustomerRegistration: true,
  });
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your website settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6 pt-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-medium">Basic Settings</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input
                id="websiteUrl"
                value={generalSettings.websiteUrl}
                onChange={(e) => setGeneralSettings({...generalSettings, websiteUrl: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="timeZone">Time Zone</Label>
              <Select
                value={generalSettings.timeZone}
                onValueChange={(value) => setGeneralSettings({...generalSettings, timeZone: value})}
              >
                <SelectTrigger id="timeZone">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">America/New York (EST)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={generalSettings.currency}
                onValueChange={(value) => setGeneralSettings({...generalSettings, currency: value})}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select
                value={generalSettings.dateFormat}
                onValueChange={(value) => setGeneralSettings({...generalSettings, dateFormat: value})}
              >
                <SelectTrigger id="dateFormat">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  <SelectItem value="DD MMM YYYY">DD MMM YYYY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <h3 className="text-lg font-medium pt-4">SEO Settings</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={generalSettings.metaTitle}
                onChange={(e) => setGeneralSettings({...generalSettings, metaTitle: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                value={generalSettings.metaDescription}
                onChange={(e) => setGeneralSettings({...generalSettings, metaDescription: e.target.value})}
                rows={3}
              />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="ecommerce" className="space-y-6 pt-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-medium">Checkout Settings</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableCheckout">Enable Checkout</Label>
                <p className="text-sm text-muted-foreground">Allow customers to complete purchases on your website</p>
              </div>
              <Switch
                id="enableCheckout"
                checked={ecommerceSettings.enableCheckout}
                onCheckedChange={(checked) => setEcommerceSettings({...ecommerceSettings, enableCheckout: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="guestCheckout">Guest Checkout</Label>
                <p className="text-sm text-muted-foreground">Allow customers to check out without creating an account</p>
              </div>
              <Switch
                id="guestCheckout"
                checked={ecommerceSettings.guestCheckout}
                onCheckedChange={(checked) => setEcommerceSettings({...ecommerceSettings, guestCheckout: checked})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="vatPercentage">GST/VAT Percentage (%)</Label>
              <Input
                id="vatPercentage"
                type="number"
                value={ecommerceSettings.vatPercentage}
                onChange={(e) => setEcommerceSettings({...ecommerceSettings, vatPercentage: parseInt(e.target.value)})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="minOrderValue">Minimum Order Value</Label>
              <Input
                id="minOrderValue"
                type="number"
                value={ecommerceSettings.minOrderValue}
                onChange={(e) => setEcommerceSettings({...ecommerceSettings, minOrderValue: parseInt(e.target.value)})}
              />
            </div>
            
            <h3 className="text-lg font-medium pt-4">Shipping Settings</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="shippingMethod">Shipping Method</Label>
              <Select
                value={ecommerceSettings.shippingMethod}
                onValueChange={(value) => setEcommerceSettings({...ecommerceSettings, shippingMethod: value})}
              >
                <SelectTrigger id="shippingMethod">
                  <SelectValue placeholder="Select shipping method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flat_rate">Flat Rate</SelectItem>
                  <SelectItem value="free">Free Shipping</SelectItem>
                  <SelectItem value="weight_based">Weight-based</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {ecommerceSettings.shippingMethod === 'flat_rate' && (
              <div className="grid gap-2">
                <Label htmlFor="flatRateAmount">Flat Rate Amount</Label>
                <Input
                  id="flatRateAmount"
                  type="number"
                  value={ecommerceSettings.flatRateAmount}
                  onChange={(e) => setEcommerceSettings({...ecommerceSettings, flatRateAmount: parseInt(e.target.value)})}
                />
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6 pt-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-medium">Email Notifications</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="orderConfirmation">Order Confirmation</Label>
                <p className="text-sm text-muted-foreground">Send email when a customer places an order</p>
              </div>
              <Switch
                id="orderConfirmation"
                checked={notificationSettings.orderConfirmation}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderConfirmation: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="orderShipped">Order Shipped</Label>
                <p className="text-sm text-muted-foreground">Send email when an order is shipped</p>
              </div>
              <Switch
                id="orderShipped"
                checked={notificationSettings.orderShipped}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderShipped: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="orderDelivered">Order Delivered</Label>
                <p className="text-sm text-muted-foreground">Send email when an order is delivered</p>
              </div>
              <Switch
                id="orderDelivered"
                checked={notificationSettings.orderDelivered}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderDelivered: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="orderCancelled">Order Cancelled</Label>
                <p className="text-sm text-muted-foreground">Send email when an order is cancelled</p>
              </div>
              <Switch
                id="orderCancelled"
                checked={notificationSettings.orderCancelled}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderCancelled: checked})}
              />
            </div>
            
            <h3 className="text-lg font-medium pt-4">Admin Notifications</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="lowStock">Low Stock Alert</Label>
                <p className="text-sm text-muted-foreground">Get notified when product stock is low</p>
              </div>
              <Switch
                id="lowStock"
                checked={notificationSettings.lowStock}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, lowStock: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newCustomerRegistration">New Customer Registration</Label>
                <p className="text-sm text-muted-foreground">Get notified when a new customer registers</p>
              </div>
              <Switch
                id="newCustomerRegistration"
                checked={notificationSettings.newCustomerRegistration}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newCustomerRegistration: checked})}
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  );
}
