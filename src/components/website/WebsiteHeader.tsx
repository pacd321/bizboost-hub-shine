import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/context/ThemeContext';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface WebsiteHeaderProps {
  isAuthenticated: boolean;
  userEmail?: string | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export function WebsiteHeader({ isAuthenticated, userEmail, onLoginClick, onLogoutClick }: WebsiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const { theme } = useTheme();

  return (
    <header 
      className="border-b sticky top-0 z-50"
      style={{ 
        backgroundColor: theme.backgroundColor,
        color: theme.textColor
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between p-4">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link 
              to="/website" 
              className="text-2xl font-bold"
              style={{ color: theme.primaryColor }}
            >
              BizAarambhShop
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/website" 
              className="text-sm font-medium hover:opacity-80"
              style={{ color: theme.textColor }}
            >
              Home
            </Link>
            <Link 
              to="/website/products" 
              className="text-sm font-medium hover:opacity-80"
              style={{ color: theme.textColor }}
            >
              Products
            </Link>
            <Link 
              to="/website/about" 
              className="text-sm font-medium hover:opacity-80"
              style={{ color: theme.textColor }}
            >
              About
            </Link>
            <Link 
              to="/website/contact" 
              className="text-sm font-medium hover:opacity-80"
              style={{ color: theme.textColor }}
            >
              Contact
            </Link>
          </nav>

          {/* Search, Cart, Account */}
          <div className="hidden md:flex items-center space-x-4">
            <form className="relative w-60">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="pl-10 pr-4 h-9"
                style={{ 
                  backgroundColor: theme.backgroundColor,
                  color: theme.textColor,
                  borderColor: theme.primaryColor
                }}
              />
            </form>
            
            <Button 
              variant="ghost" 
              size="icon"
              style={{ color: theme.primaryColor }}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full p-0 text-xs"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    style={{ color: theme.primaryColor }}
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">User account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56"
                  style={{ 
                    backgroundColor: theme.backgroundColor,
                    color: theme.textColor
                  }}
                >
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>My Account</span>
                      <span className="text-xs text-muted-foreground">{userEmail}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogoutClick}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLoginClick}
                style={{ 
                  borderColor: theme.primaryColor,
                  color: theme.primaryColor
                }}
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: theme.primaryColor }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div 
            className="md:hidden border-t py-4 px-4"
            style={{ 
              backgroundColor: theme.backgroundColor,
              color: theme.textColor
            }}
          >
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/website" 
                className="text-sm font-medium hover:opacity-80"
                style={{ color: theme.textColor }}
              >
                Home
              </Link>
              <Link 
                to="/website/products" 
                className="text-sm font-medium hover:opacity-80"
                style={{ color: theme.textColor }}
              >
                Products
              </Link>
              <Link 
                to="/website/about" 
                className="text-sm font-medium hover:opacity-80"
                style={{ color: theme.textColor }}
              >
                About
              </Link>
              <Link 
                to="/website/contact" 
                className="text-sm font-medium hover:opacity-80"
                style={{ color: theme.textColor }}
              >
                Contact
              </Link>
              
              <div className="pt-4 border-t">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <div className="text-sm font-medium">{userEmail}</div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={onLogoutClick}
                      style={{ 
                        borderColor: theme.primaryColor,
                        color: theme.primaryColor
                      }}
                    >
                      Log out
                    </Button>
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={onLoginClick}
                    style={{ 
                      backgroundColor: theme.primaryColor,
                      color: theme.backgroundColor
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login / Register
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
