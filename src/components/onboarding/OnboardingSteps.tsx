
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Check } from 'lucide-react';

interface OnboardingStepsProps {
  onComplete?: () => void;
}

export function OnboardingSteps({ onComplete }: OnboardingStepsProps) {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: ''
  });

  const steps = [
    {
      title: "Welcome to BizBoost",
      description: "A complete business management platform for small businesses",
      content: (
        <div className="space-y-4 py-4">
          <p>BizBoost helps you manage your business efficiently with powerful features:</p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Smart Inventory Management with OCR</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Customer Support Ticketing System</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Market Intelligence & Competitor Analysis</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Delivery & Warehouse Management</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>AI-Powered Business Analytics</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: "Tell us about your business",
      description: "Let's set up your profile",
      content: (
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Business Name</Label>
            <Input
              id="name"
              value={businessInfo.name}
              onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
              placeholder="Enter your business name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Business Email</Label>
            <Input
              id="email"
              type="email"
              value={businessInfo.email}
              onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
              placeholder="Enter your business email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={businessInfo.phone}
              onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Input
              id="address"
              value={businessInfo.address}
              onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
              placeholder="Enter your business address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              value={businessInfo.website}
              onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
              placeholder="Enter your website URL"
            />
          </div>
        </div>
      )
    },
    {
      title: "Ready to go!",
      description: "Your dashboard is set up and ready to use",
      content: (
        <div className="space-y-4 py-8 text-center">
          <div className="mx-auto rounded-full bg-green-100 p-3 w-16 h-16 flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium mt-4">All Set!</h3>
          <p className="text-gray-500">
            Your BizBoost dashboard is ready. Start exploring the features and boost your business efficiency today!
          </p>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      // Validate current step if needed
      if (currentStep === 1 && (!businessInfo.name || !businessInfo.email)) {
        toast({
          title: "Please complete the form",
          description: "Business name and email are required.",
          variant: "destructive"
        });
        return;
      }
      
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      toast({
        title: "Welcome to BizBoost!",
        description: "Your dashboard is now ready to use."
      });
      
      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>{steps[currentStep].title}</CardTitle>
        <CardDescription>{steps[currentStep].description}</CardDescription>
      </CardHeader>
      <CardContent>
        {steps[currentStep].content}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        <Button onClick={handleNext}>
          {currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
        </Button>
      </CardFooter>
    </Card>
  );
}
