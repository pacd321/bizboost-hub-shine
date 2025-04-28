import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import React, { useEffect, useState } from 'react';

interface ContactContent {
  title: string;
  subtitle: string;
  address: string;
  email: string;
  phone: string;
  mapEmbed: string;
}

export function WebsiteContact() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [content, setContent] = useState<ContactContent>({
    title: 'Contact Us',
    subtitle: 'Get in touch with our friendly team',
    address: '123 Business Avenue, Mumbai, Maharashtra, India',
    email: 'support@bizboostshop.com',
    phone: '+91 98765 43210',
    mapEmbed: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem('websiteContent');
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent);
      if (parsedContent.contact) {
        setContent(parsedContent.contact);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon!",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.textColor }}>
                  Address
                </h3>
                <p style={{ color: theme.textColor }}>{content.address}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.textColor }}>
                  Email
                </h3>
                <p style={{ color: theme.textColor }}>{content.email}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.textColor }}>
                  Phone
                </h3>
                <p style={{ color: theme.textColor }}>{content.phone}</p>
              </div>
            </div>

            {content.mapEmbed && (
              <div className="mt-8" dangerouslySetInnerHTML={{ __html: content.mapEmbed }} />
            )}
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{ 
                    backgroundColor: theme.backgroundColor,
                    color: theme.textColor,
                    borderColor: theme.primaryColor
                  }}
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={{ 
                    backgroundColor: theme.backgroundColor,
                    color: theme.textColor,
                    borderColor: theme.primaryColor
                  }}
                />
              </div>
              
              <div>
                <Input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  style={{ 
                    backgroundColor: theme.backgroundColor,
                    color: theme.textColor,
                    borderColor: theme.primaryColor
                  }}
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows={5}
                  style={{ 
                    backgroundColor: theme.backgroundColor,
                    color: theme.textColor,
                    borderColor: theme.primaryColor
                  }}
                />
              </div>
              
              <Button 
                type="submit"
                style={{ 
                  backgroundColor: theme.primaryColor,
                  color: theme.backgroundColor
                }}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 