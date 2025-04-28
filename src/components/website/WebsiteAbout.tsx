import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';

interface AboutContent {
  title: string;
  subtitle: string;
  story: string;
  mission: string;
  vision: string;
}

export function WebsiteAbout() {
  const { theme } = useTheme();
  const [content, setContent] = useState<AboutContent>({
    title: 'About Our Company',
    subtitle: 'Learn more about who we are and what we do',
    story: 'Founded in 2020, StartKaroShop started as a small online store catering to local businesses. Over the years, we have grown into a trusted supplier of quality products for businesses across the country.\n\nOur mission is to provide businesses with the tools they need to succeed at competitive prices, with excellent customer service.',
    mission: 'To empower businesses with high-quality products and exceptional service.',
    vision: 'To become the leading online marketplace for business supplies in the country.',
  });

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem('websiteContent');
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent);
      if (parsedContent.about) {
        setContent(parsedContent.about);
      }
    }
  }, []);

  return (
    <section className="py-16" style={{ backgroundColor: theme.backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: theme.textColor }}>
            {content.title}
          </h1>
          <p className="text-xl" style={{ color: theme.textColor }}>
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: theme.textColor }}>
              Our Story
            </h2>
            <p className="whitespace-pre-line" style={{ color: theme.textColor }}>
              {content.story}
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: theme.textColor }}>
                Our Mission
              </h2>
              <p style={{ color: theme.textColor }}>{content.mission}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: theme.textColor }}>
                Our Vision
              </h2>
              <p style={{ color: theme.textColor }}>{content.vision}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 