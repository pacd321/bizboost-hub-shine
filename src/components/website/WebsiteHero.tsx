import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

export function WebsiteHero() {
  const { theme } = useTheme();

  return (
    <section className="relative py-16 sm:py-24" style={{ 
      background: `linear-gradient(to bottom, ${theme.primaryColor}10, ${theme.backgroundColor})`,
      color: theme.textColor
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Quality Products for Your Business
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              Discover our extensive catalog of products designed to help your business thrive. From electronics to office supplies, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
              <Button 
                size="lg"
                style={{ 
                  backgroundColor: theme.primaryColor,
                  borderRadius: theme.buttonStyle === 'rounded' ? '0.375rem' : 
                              theme.buttonStyle === 'pill' ? '9999px' : '0'
                }}
              >
                Shop Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                style={{ 
                  borderColor: theme.primaryColor,
                  color: theme.primaryColor,
                  borderRadius: theme.buttonStyle === 'rounded' ? '0.375rem' : 
                              theme.buttonStyle === 'pill' ? '9999px' : '0'
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:w-1/2">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Hero Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
