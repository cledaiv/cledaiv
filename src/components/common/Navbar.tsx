
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  // Track scrolling to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Explorer', path: '/browse' },
    { name: 'Comment ça marche', path: '/how-it-works' },
    { name: 'À propos', path: '/about' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        scrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-semibold relative z-10 flex items-center"
        >
          <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
            FreelanceAI
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={cn('hidden md:flex items-center space-x-8')}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary relative py-2',
                location.pathname === link.path
                  ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:content-[""] after:rounded-full'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-muted-foreground hover:text-primary hover:bg-transparent"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline" className="transition-all duration-300">
                  Se connecter
                </Button>
              </Link>
              <Link to="/auth?type=signup">
                <Button className="bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-white transition-all duration-300">
                  S'inscrire
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-10 p-2 text-muted-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        {isMobile && (
          <div
            className={cn(
              'fixed inset-0 bg-background/95 backdrop-blur-md transition-transform duration-300 ease-in-out z-0',
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            )}
          >
            <div className="flex flex-col h-full justify-center items-center gap-8 p-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-xl font-medium transition-all duration-300 hover:text-primary',
                    location.pathname === link.path
                      ? 'text-primary scale-110'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8 flex flex-col space-y-4 w-full max-w-xs">
                {user ? (
                  <Button onClick={() => { setMenuOpen(false); }} className="w-full">
                    Mon profil
                  </Button>
                ) : (
                  <>
                    <Link to="/auth" className="w-full">
                      <Button variant="outline" className="w-full">
                        Se connecter
                      </Button>
                    </Link>
                    <Link to="/auth?type=signup" className="w-full">
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-cyan-400">
                        S'inscrire
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
