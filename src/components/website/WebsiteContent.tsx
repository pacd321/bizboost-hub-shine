
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';
import { useState } from 'react';

export function WebsiteContent() {
  const [activeTab, setActiveTab] = useState('home');
  const { toast } = useToast();
  
  const [homeContent, setHomeContent] = useState({
    heroTitle: 'Quality Products for Your Business',
    heroSubtitle: 'Discover our extensive catalog of products designed to help your business thrive. From electronics to office supplies, we\'ve got you covered.',
    featureTitle: 'Why Choose Us',
    featureSubtitle: 'We provide the best services for your business needs',
  });
  
  const [aboutContent, setAboutContent] = useState({
    title: 'About Our Company',
    subtitle: 'Learn more about who we are and what we do',
    story: 'Founded in 2020, StartKaroShop started as a small online store catering to local businesses. Over the years, we have grown into a trusted supplier of quality products for businesses across the country.\n\nOur mission is to provide businesses with the tools they need to succeed at competitive prices, with excellent customer service.',
    mission: 'To empower businesses with high-quality products and exceptional service.',
    vision: 'To become the leading online marketplace for business supplies in the country.',
  });
  
  const [contactContent, setContactContent] = useState({
    title: 'Contact Us',
    subtitle: 'Get in touch with our friendly team',
    address: '123 Business Avenue, Mumbai, Maharashtra, India',
    email: 'support@bizboostshop.com',
    phone: '+91 98765 43210',
    mapEmbed: '',
  });
  
  const handleSave = () => {
    toast({
      title: "Content Updated",
      description: "Your website content has been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="home">Home Page</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
          <TabsTrigger value="contact">Contact Page</TabsTrigger>
        </TabsList>
        
        <TabsContent value="home" className="space-y-6 pt-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-medium">Hero Section</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input
                id="heroTitle"
                value={homeContent.heroTitle}
                onChange={(e) => setHomeContent({...homeContent, heroTitle: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
              <Textarea
                id="heroSubtitle"
                value={homeContent.heroSubtitle}
                onChange={(e) => setHomeContent({...homeContent, heroSubtitle: e.target.value})}
                rows={3}
              />
            </div>
            
            <h3 className="text-lg font-medium pt-4">Features Section</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="featureTitle">Feature Section Title</Label>
              <Input
                id="featureTitle"
                value={homeContent.featureTitle}
                onChange={(e) => setHomeContent({...homeContent, featureTitle: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="featureSubtitle">Feature Section Subtitle</Label>
              <Input
                id="featureSubtitle"
                value={homeContent.featureSubtitle}
                onChange={(e) => setHomeContent({...homeContent, featureSubtitle: e.target.value})}
              />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="about" className="space-y-6 pt-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-medium">About Page</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="aboutTitle">Page Title</Label>
              <Input
                id="aboutTitle"
                value={aboutContent.title}
                onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="aboutSubtitle">Page Subtitle</Label>
              <Input
                id="aboutSubtitle"
                value={aboutContent.subtitle}
                onChange={(e) => setAboutContent({...aboutContent, subtitle: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="aboutStory">Our Story</Label>
              <Textarea
                id="aboutStory"
                value={aboutContent.story}
                onChange={(e) => setAboutContent({...aboutContent, story: e.target.value})}
                rows={6}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="mission">Our Mission</Label>
              <Input
                id="mission"
                value={aboutContent.mission}
                onChange={(e) => setAboutContent({...aboutContent, mission: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="vision">Our Vision</Label>
              <Input
                id="vision"
                value={aboutContent.vision}
                onChange={(e) => setAboutContent({...aboutContent, vision: e.target.value})}
              />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact" className="space-y-6 pt-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-medium">Contact Page</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="contactTitle">Page Title</Label>
              <Input
                id="contactTitle"
                value={contactContent.title}
                onChange={(e) => setContactContent({...contactContent, title: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="contactSubtitle">Page Subtitle</Label>
              <Input
                id="contactSubtitle"
                value={contactContent.subtitle}
                onChange={(e) => setContactContent({...contactContent, subtitle: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={contactContent.address}
                onChange={(e) => setContactContent({...contactContent, address: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={contactContent.email}
                onChange={(e) => setContactContent({...contactContent, email: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={contactContent.phone}
                onChange={(e) => setContactContent({...contactContent, phone: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="mapEmbed">Google Maps Embed Code</Label>
              <Textarea
                id="mapEmbed"
                value={contactContent.mapEmbed}
                onChange={(e) => setContactContent({...contactContent, mapEmbed: e.target.value})}
                rows={3}
                placeholder="Paste your Google Maps embed code here"
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Check className="mr-2 h-4 w-4" />
          Save Content
        </Button>
      </div>
    </div>
  );
}
