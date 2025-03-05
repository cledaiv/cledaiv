
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, CreditCard } from 'lucide-react';

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-sm font-medium transition-colors hover:text-primary">
    {children}
  </Link>
);

const NavLinks = () => {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/browse">Explorer</NavLink>
      <NavLink to="/how-it-works">Comment ça marche</NavLink>
      <NavLink to="/chatbot">Assistant IA</NavLink>
      <NavLink to="/blockchain-api">API Blockchain</NavLink>
      <NavLink to="/subscription">
        <div className="flex items-center space-x-1">
          <CreditCard className="h-4 w-4" />
          <span>Abonnements</span>
        </div>
      </NavLink>
    </nav>
  );
};

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="bg-background border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/lovable-uploads/c22cfa59-ebf6-498e-b529-f34c40ef1f03.png" alt="CLEDAIV Logo" className="h-8 w-auto" />
          <span className="font-bold text-xl text-green-500">MyFreelancer</span>
        </Link>
        <NavLinks />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url as string} alt={user?.user_metadata?.full_name as string} />
                  <AvatarFallback>{(user?.user_metadata?.full_name as string)?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="w-full h-full block">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onSelect={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/auth">
            <Button>Se connecter</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
