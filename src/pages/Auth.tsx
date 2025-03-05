
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Mail, Github, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signin');
  
  // Get type from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type === 'signup') {
      setAuthType('signup');
    } else {
      setAuthType('signin');
    }
  }, [location]);
  
  // State for form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState<'client' | 'freelancer'>('client');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      
      // Show a success toast message
      toast({
        title: authType === 'signin' ? 'Connexion réussie' : 'Compte créé avec succès',
        description: authType === 'signin' 
          ? 'Bienvenue sur FreelanceAI.' 
          : 'Votre compte a été créé. Vous pouvez maintenant vous connecter.',
        variant: 'default',
      });
      
      // Redirect to dashboard or home
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <div className="container max-w-screen-xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Button>
        
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left side - Auth form */}
          <div className="order-2 md:order-1">
            <Card className="border-border/40 shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {authType === 'signin' ? 'Connexion' : 'Créer un compte'}
                </CardTitle>
                <CardDescription>
                  {authType === 'signin' 
                    ? 'Entrez vos informations pour vous connecter à votre compte'
                    : 'Remplissez le formulaire ci-dessous pour créer votre compte'
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs 
                  value={authType} 
                  onValueChange={(v) => setAuthType(v as 'signin' | 'signup')}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="signin">Connexion</TabsTrigger>
                    <TabsTrigger value="signup">Inscription</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="nom@example.com" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Mot de passe</Label>
                          <Link 
                            to="/forgot-password" 
                            className="text-xs text-muted-foreground hover:text-primary"
                          >
                            Mot de passe oublié?
                          </Link>
                        </div>
                        <Input 
                          id="password" 
                          type="password" 
                          placeholder="••••••••" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label 
                          htmlFor="remember" 
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          Se souvenir de moi
                        </label>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Connexion en cours...' : 'Se connecter'}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input 
                          id="name" 
                          type="text" 
                          placeholder="Votre nom" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input 
                          id="signup-email" 
                          type="email" 
                          placeholder="nom@example.com" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Mot de passe</Label>
                        <Input 
                          id="signup-password" 
                          type="password" 
                          placeholder="••••••••" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Type de compte</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div
                            className={cn(
                              "border rounded-md p-4 cursor-pointer transition-all",
                              accountType === 'client' 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-primary/50"
                            )}
                            onClick={() => setAccountType('client')}
                          >
                            <div className="font-medium">Client</div>
                            <div className="text-xs text-muted-foreground">
                              Je cherche des freelances
                            </div>
                          </div>
                          
                          <div
                            className={cn(
                              "border rounded-md p-4 cursor-pointer transition-all",
                              accountType === 'freelancer' 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-primary/50"
                            )}
                            onClick={() => setAccountType('freelancer')}
                          >
                            <div className="font-medium">Freelance</div>
                            <div className="text-xs text-muted-foreground">
                              Je propose mes services
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <label 
                          htmlFor="terms" 
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          J'accepte les{' '}
                          <Link to="/terms" className="text-primary hover:underline">
                            conditions d'utilisation
                          </Link>
                          {' '}et la{' '}
                          <Link to="/privacy-policy" className="text-primary hover:underline">
                            politique de confidentialité
                          </Link>
                        </label>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Création en cours...' : 'Créer un compte'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4 pt-0">
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-2 text-muted-foreground">
                      Ou continuer avec
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          {/* Right side - Brand message */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <div className="mb-6">
              <Link to="/" className="inline-block">
                <span className="text-3xl font-semibold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                  FreelanceAI
                </span>
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {authType === 'signin' 
                ? 'Bienvenue à nouveau' 
                : 'Rejoignez notre communauté'
              }
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto md:mx-0">
              {authType === 'signin'
                ? 'Connectez-vous pour accéder à votre espace et gérer vos projets avec nos freelances experts.'
                : 'Créez votre compte pour trouver les meilleurs talents dans les domaines de l\'IA, blockchain et crypto, ou proposez vos services en tant que freelance.'
              }
            </p>
            
            <div className="bg-gradient-to-br from-indigo-500/10 to-cyan-400/10 p-6 rounded-xl border border-indigo-500/20 mb-8 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2">
                {authType === 'signin' 
                  ? 'Accédez à votre espace personnel'
                  : 'Pourquoi nous rejoindre ?'
                }
              </h3>
              <ul className="space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">
                    {authType === 'signin'
                      ? 'Gérez vos projets en cours et passés'
                      : 'Accédez à une communauté de talents spécialisés'
                    }
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">
                    {authType === 'signin'
                      ? 'Communiquez avec vos freelances'
                      : 'Système de paiement sécurisé avec escrow'
                    }
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm">
                    {authType === 'signin'
                      ? 'Accédez à vos factures et historique de paiements'
                      : 'Outils collaboratifs pour gérer efficacement vos projets'
                    }
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
