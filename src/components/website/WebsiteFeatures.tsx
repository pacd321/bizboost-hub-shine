import { useTheme } from '@/context/ThemeContext';
import { HeadsetIcon, Package, ShieldCheck, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface HomeContent {
  featureTitle: string;
  featureSubtitle: string;
  features: Feature[];
}

export function WebsiteFeatures() {
  const { theme } = useTheme();
  const [content, setContent] = useState<HomeContent>({
    featureTitle: 'Why Choose Us',
    featureSubtitle: 'We provide the best services for your business needs',
    features: [
      {
        icon: 'Package',
        title: 'Quality Products',
        description: 'All our products are carefully selected and tested for quality.'
      },
      {
        icon: 'Truck',
        title: 'Fast Delivery',
        description: 'We ensure quick delivery to all locations across the country.'
      },
      {
        icon: 'HeadsetIcon',
        title: '24/7 Support',
        description: 'Our customer support team is available round the clock.'
      },
      {
        icon: 'ShieldCheck',
        title: 'Secure Payments',
        description: 'All transactions are processed securely with encryption.'
      }
    ]
  });

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem('websiteContent');
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent);
      if (parsedContent.home) {
        setContent(parsedContent.home);
      }
    }
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Package':
        return Package;
      case 'Truck':
        return Truck;
      case 'HeadsetIcon':
        return HeadsetIcon;
      case 'ShieldCheck':
        return ShieldCheck;
      default:
        return Package;
    }
  };

  return (
    <section className="py-12" style={{ backgroundColor: theme.backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold" style={{ color: theme.textColor }}>
            {content.featureTitle}
          </h2>
          <p className="mt-4 text-lg" style={{ color: theme.textColor }}>
            {content.featureSubtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.features.map((feature, index) => {
            const Icon = getIconComponent(feature.icon);
            return (
              <div 
                key={index} 
                className="p-6 rounded-lg shadow-sm text-center"
                style={{ 
                  backgroundColor: theme.backgroundColor,
                  color: theme.textColor
                }}
              >
                <div 
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${theme.primaryColor}10` }}
                >
                  <Icon className="h-6 w-6" style={{ color: theme.primaryColor }} />
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
