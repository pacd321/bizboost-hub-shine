
import React from 'react';
import { Package, Truck, HeadsetIcon, ShieldCheck } from 'lucide-react';

export function WebsiteFeatures() {
  const features = [
    {
      icon: Package,
      title: 'Quality Products',
      description: 'All our products are carefully selected and tested for quality.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'We ensure quick delivery to all locations across the country.'
    },
    {
      icon: HeadsetIcon,
      title: '24/7 Support',
      description: 'Our customer support team is available round the clock.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      description: 'All transactions are processed securely with encryption.'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose Us</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We provide the best services for your business needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
