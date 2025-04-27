
import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Eye, Settings, Plus, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WebsiteSettings } from '../components/website/WebsiteSettings';
import { WebsiteProducts } from '../components/website/WebsiteProducts';
import { WebsiteAppearance } from '../components/website/WebsiteAppearance';
import { WebsiteContent } from '../components/website/WebsiteContent';

const YourWebsitePage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const { toast } = useToast();

  const handlePreview = () => {
    window.open('/website', '_blank');
  };

  const handlePublish = () => {
    toast({
      title: "Website Published",
      description: "Your changes have been published successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <h1 className="text-3xl font-bold">Your Website</h1>
          <div className="flex gap-2">
            <Button onClick={handlePreview} variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview Website
            </Button>
            <Button onClick={handlePublish}>
              <Settings className="h-4 w-4 mr-2" />
              Publish Changes
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Website Products</CardTitle>
                    <CardDescription>Manage products displayed on your website</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <WebsiteProducts />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Appearance</CardTitle>
                <CardDescription>Customize how your website looks</CardDescription>
              </CardHeader>
              <CardContent>
                <WebsiteAppearance />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Content</CardTitle>
                <CardDescription>Edit your website content</CardDescription>
              </CardHeader>
              <CardContent>
                <WebsiteContent />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Settings</CardTitle>
                <CardDescription>Configure your website behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <WebsiteSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default YourWebsitePage;
