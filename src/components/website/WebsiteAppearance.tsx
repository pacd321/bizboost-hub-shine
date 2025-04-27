
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export function WebsiteAppearance() {
  const [activeTab, setActiveTab] = useState('theme');
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    theme: {
      primaryColor: '#0066FF',
      backgroundColor: '#FFFFFF',
      textColor: '#222222',
      fontFamily: 'Inter',
      buttonStyle: 'rounded',
    },
    layout: {
      headerStyle: 'standard',
      footerColumns: '4',
      productGridColumns: '4',
      showHero: true,
      showFeatures: true,
      showTestimonials: true,
    },
    branding: {
      storeName: 'BizBoost Shop',
      logoUrl: '',
      favicon: '',
      tagline: 'Quality Products for Your Business',
    },
  });
  
  const handleChange = (section: keyof typeof settings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof settings],
        [field]: value
      }
    }));
  };
  
  const handleSave = () => {
    toast({
      title: "Appearance Updated",
      description: "Your website appearance settings have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>
        
        <TabsContent value="theme" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Colors and Typography</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.theme.primaryColor}
                    onChange={(e) => handleChange('theme', 'primaryColor', e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={settings.theme.primaryColor}
                    onChange={(e) => handleChange('theme', 'primaryColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={settings.theme.backgroundColor}
                    onChange={(e) => handleChange('theme', 'backgroundColor', e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={settings.theme.backgroundColor}
                    onChange={(e) => handleChange('theme', 'backgroundColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="textColor">Text Color</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="textColor"
                    type="color"
                    value={settings.theme.textColor}
                    onChange={(e) => handleChange('theme', 'textColor', e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={settings.theme.textColor}
                    onChange={(e) => handleChange('theme', 'textColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="fontFamily">Font Family</Label>
                <Select 
                  value={settings.theme.fontFamily}
                  onValueChange={(value) => handleChange('theme', 'fontFamily', value)}
                >
                  <SelectTrigger id="fontFamily">
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Lato">Lato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="buttonStyle">Button Style</Label>
                <Select 
                  value={settings.theme.buttonStyle}
                  onValueChange={(value) => handleChange('theme', 'buttonStyle', value)}
                >
                  <SelectTrigger id="buttonStyle">
                    <SelectValue placeholder="Select button style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rounded">Rounded</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="pill">Pill</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="layout" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Layout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="headerStyle">Header Style</Label>
                <Select 
                  value={settings.layout.headerStyle}
                  onValueChange={(value) => handleChange('layout', 'headerStyle', value)}
                >
                  <SelectTrigger id="headerStyle">
                    <SelectValue placeholder="Select header style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="centered">Centered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="footerColumns">Footer Columns</Label>
                <Select 
                  value={settings.layout.footerColumns}
                  onValueChange={(value) => handleChange('layout', 'footerColumns', value)}
                >
                  <SelectTrigger id="footerColumns">
                    <SelectValue placeholder="Select footer columns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Columns</SelectItem>
                    <SelectItem value="4">4 Columns</SelectItem>
                    <SelectItem value="5">5 Columns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="productGridColumns">Product Grid Columns</Label>
                <Select 
                  value={settings.layout.productGridColumns}
                  onValueChange={(value) => handleChange('layout', 'productGridColumns', value)}
                >
                  <SelectTrigger id="productGridColumns">
                    <SelectValue placeholder="Select product grid columns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Columns</SelectItem>
                    <SelectItem value="3">3 Columns</SelectItem>
                    <SelectItem value="4">4 Columns</SelectItem>
                    <SelectItem value="5">5 Columns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showHero" className="font-medium">Hero Section</Label>
                      <p className="text-sm text-muted-foreground">Display hero banner</p>
                    </div>
                    <Input
                      id="showHero"
                      type="checkbox"
                      checked={settings.layout.showHero}
                      onChange={(e) => handleChange('layout', 'showHero', e.target.checked)}
                      className="w-6 h-6"
                    />
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showFeatures" className="font-medium">Features Section</Label>
                      <p className="text-sm text-muted-foreground">Display features</p>
                    </div>
                    <Input
                      id="showFeatures"
                      type="checkbox"
                      checked={settings.layout.showFeatures}
                      onChange={(e) => handleChange('layout', 'showFeatures', e.target.checked)}
                      className="w-6 h-6"
                    />
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showTestimonials" className="font-medium">Testimonials</Label>
                      <p className="text-sm text-muted-foreground">Display testimonials</p>
                    </div>
                    <Input
                      id="showTestimonials"
                      type="checkbox"
                      checked={settings.layout.showTestimonials}
                      onChange={(e) => handleChange('layout', 'showTestimonials', e.target.checked)}
                      className="w-6 h-6"
                    />
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="branding" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  value={settings.branding.storeName}
                  onChange={(e) => handleChange('branding', 'storeName', e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={settings.branding.tagline}
                  onChange={(e) => handleChange('branding', 'tagline', e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="logoUrl">Logo</Label>
                <div className="flex gap-4 items-center">
                  <div className="h-16 w-16 border rounded flex items-center justify-center bg-gray-50">
                    {settings.branding.logoUrl ? (
                      <img 
                        src={settings.branding.logoUrl} 
                        alt="Logo" 
                        className="max-h-full max-w-full"
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">No logo</span>
                    )}
                  </div>
                  <Button variant="outline">Upload Logo</Button>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="favicon">Favicon</Label>
                <div className="flex gap-4 items-center">
                  <div className="h-10 w-10 border rounded flex items-center justify-center bg-gray-50">
                    {settings.branding.favicon ? (
                      <img 
                        src={settings.branding.favicon} 
                        alt="Favicon" 
                        className="max-h-full max-w-full"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">No icon</span>
                    )}
                  </div>
                  <Button variant="outline">Upload Favicon</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
