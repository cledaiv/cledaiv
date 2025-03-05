
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 - Logo & About */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                FreelanceAI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Plateforme spécialisée dans la mise en relation de talents freelance
              en intelligence artificielle, blockchain et cryptomonnaie.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Github"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick links */}
          <div>
            <h3 className="font-medium text-md mb-4">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/browse" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Explorer
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Categories */}
          <div>
            <h3 className="font-medium text-md mb-4">Catégories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/browse?category=ai" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Intelligence Artificielle
                </Link>
              </li>
              <li>
                <Link to="/browse?category=blockchain" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blockchain
                </Link>
              </li>
              <li>
                <Link to="/browse?category=crypto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cryptomonnaie
                </Link>
              </li>
              <li>
                <Link to="/browse?category=sme" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Services PME
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="font-medium text-md mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Recevez nos dernières nouvelles et offres spéciales.
            </p>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Votre email" 
                  className="max-w-[200px]"
                />
                <Button>S'abonner</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                En vous inscrivant, vous acceptez notre 
                <Link to="/privacy-policy" className="text-primary hover:underline ml-1">
                  politique de confidentialité
                </Link>.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} FreelanceAI. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Conditions d'utilisation
              </Link>
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
