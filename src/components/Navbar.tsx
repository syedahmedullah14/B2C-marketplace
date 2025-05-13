
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Home, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Navbar: React.FC = () => {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-marketplace-primary">MarketHub</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" icon={<Home size={18} />} label="Home" />
            <NavLink to="/categories" label="Categories" />
            <NavLink 
              to="/cart" 
              icon={<ShoppingCart size={18} />} 
              label="Cart" 
              badge={getCartCount() > 0 ? getCartCount() : undefined} 
            />
            <NavLink to="/profile" icon={<User size={18} />} label="Profile" />
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-slide-in">
            <div className="flex flex-col space-y-4">
              <MobileNavLink to="/" icon={<Home size={18} />} label="Home" onClick={toggleMobileMenu} />
              <MobileNavLink to="/categories" label="Categories" onClick={toggleMobileMenu} />
              <MobileNavLink 
                to="/cart" 
                icon={<ShoppingCart size={18} />} 
                label="Cart" 
                badge={getCartCount() > 0 ? getCartCount() : undefined}
                onClick={toggleMobileMenu}
              />
              <MobileNavLink to="/profile" icon={<User size={18} />} label="Profile" onClick={toggleMobileMenu} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, icon, badge }) => (
  <Link 
    to={to} 
    className="flex items-center text-gray-600 hover:text-marketplace-primary transition-colors"
  >
    {icon && <span className="mr-1">{icon}</span>}
    {label}
    {badge !== undefined && (
      <Badge variant="destructive" className="ml-1 bg-marketplace-primary">
        {badge}
      </Badge>
    )}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, icon, badge, onClick }) => (
  <Link 
    to={to} 
    className="flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-md"
    onClick={onClick}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {label}
    {badge !== undefined && (
      <Badge variant="destructive" className="ml-1 bg-marketplace-primary">
        {badge}
      </Badge>
    )}
  </Link>
);

export default Navbar;
