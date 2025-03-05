
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PricingFeature from './PricingFeature';
import CustomQuote from './CustomQuote';

const SubscriptionPlans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = (plan: string) => {
    if (!user) {
      navigate('/auth?redirect=subscription');
      return;
    }
    
    // Redirect to the payment page with the selected plan
    navigate(`/payment?plan=${plan}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Plan Freelance */}
      <Card className="border-2 hover:border-primary/50 transition-all duration-200">
        <CardHeader>
          <CardTitle className="text-2xl">Freelance</CardTitle>
          <CardDescription>
            Idéal pour les freelances qui cherchent des projets et des clients.
          </CardDescription>
          <div className="mt-4">
            <span className="text-4xl font-bold">29,99€</span>
            <span className="text-muted-foreground">/mois</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <PricingFeature>Accès à tous les projets</PricingFeature>
          <PricingFeature>Profil freelance avancé</PricingFeature>
          <PricingFeature>Système de paiement sécurisé</PricingFeature>
          <PricingFeature>Commission de 15% sur les prestations</PricingFeature>
          <PricingFeature>Support client prioritaire</PricingFeature>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => handleSubscribe('freelance')}>
            Souscrire
          </Button>
        </CardFooter>
      </Card>

      {/* Plan Client */}
      <Card className="border-2 border-primary shadow-lg relative md:scale-105">
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs rounded-bl-lg rounded-tr-lg font-medium">
          Populaire
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">Client</CardTitle>
          <CardDescription>
            Pour les entreprises qui recherchent des freelances qualifiés.
          </CardDescription>
          <div className="mt-4">
            <span className="text-4xl font-bold">99,99€</span>
            <span className="text-muted-foreground">/mois</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <PricingFeature>Accès à tous les freelances</PricingFeature>
          <PricingFeature>Publication de projets illimitée</PricingFeature>
          <PricingFeature>Système d'entiercement sécurisé</PricingFeature>
          <PricingFeature>Commission de 15% sur les prestations</PricingFeature>
          <PricingFeature>Support client dédié</PricingFeature>
          <PricingFeature>Accès aux freelances premium</PricingFeature>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => handleSubscribe('client')}>
            Souscrire
          </Button>
        </CardFooter>
      </Card>

      {/* Solutions Clés en Main */}
      <Card className="border-2 hover:border-primary/50 transition-all duration-200">
        <CardHeader>
          <CardTitle className="text-2xl">Clés en Main</CardTitle>
          <CardDescription>
            Solutions personnalisées pour les projets complexes.
          </CardDescription>
          <div className="mt-4">
            <span className="text-2xl font-bold">Sur devis</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <PricingFeature>Équipe dédiée de freelances</PricingFeature>
          <PricingFeature>Gestion de projet complète</PricingFeature>
          <PricingFeature>Solutions sur mesure</PricingFeature>
          <PricingFeature>Commission de 15% sur les prestations</PricingFeature>
          <PricingFeature>Support client prioritaire 24/7</PricingFeature>
          <PricingFeature>Chef de projet dédié</PricingFeature>
        </CardContent>
        <CardFooter>
          <CustomQuote />
        </CardFooter>
      </Card>
    </div>
  );
};

export default SubscriptionPlans;
