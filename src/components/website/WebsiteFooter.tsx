import { useTheme } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';

export function WebsiteFooter() {
  const { theme } = useTheme();

  return (
    <footer style={{ 
      backgroundColor: theme.backgroundColor,
      color: theme.textColor
    }}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 
              className="text-xl font-bold mb-4"
              style={{ color: theme.primaryColor }}
            >
              StartKaroShop
            </h3>
            <p className="text-sm">
              Quality products for businesses and individuals.
              Fast delivery, excellent customer service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/website/products/electronics" 
                  className="text-sm hover:opacity-80"
                  style={{ color: theme.textColor }}
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link 
                  to="/website/products/apparel" 
                  className="text-sm hover:opacity-80"
                  style={{ color: theme.textColor }}
                >
                  Apparel
                </Link>
              </li>
              <li>
                <Link 
                  to="/website/products/kitchenware" 
                  className="text-sm hover:opacity-80"
                  style={{ color: theme.textColor }}
                >
                  Kitchenware
                </Link>
              </li>
              <li>
                <Link 
                  to="/website/products/beauty" 
                  className="text-sm hover:opacity-80"
                  style={{ color: theme.textColor }}
                >
                  Beauty
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/website/about" 
                  className="text-sm hover:opacity-80"
                  style={{ color: theme.textColor }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/website/contact" 
                  className="text-sm hover:opacity-80"
                  style={{ color: theme.textColor }}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/website/careers" 
                  className="text-sm hover:opacity-80"
                  style={{ color: theme.textColor }}
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  to="/website/blog" 
                  className="text-sm hover:opacity-80"
                  style={{ color: theme.textColor }}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/website/support" 
                  className="text-sm hover:opacity-80"
                  style={{ color: theme.textColor }}
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link 
                  to="/website/shipping" 
                  className="text-sm hover:opacity-80"
                  style={{ color: theme.textColor }}
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/website/returns" 
                  className="text-sm hover:opacity-80"
                  style={{ color: theme.textColor }}
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link 
                  to="/website/faq" 
                  className="text-sm hover:opacity-80"
                  style={{ color: theme.textColor }}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div 
          className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          style={{ borderColor: theme.primaryColor }}
        >
          <p className="text-sm">© {new Date().getFullYear()} StartKaroShop. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link 
              to="/website/terms" 
              className="text-sm hover:opacity-80"
              style={{ color: theme.textColor }}
            >
              Terms of Service
            </Link>
            <Link 
              to="/website/privacy" 
              className="text-sm hover:opacity-80"
              style={{ color: theme.textColor }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
