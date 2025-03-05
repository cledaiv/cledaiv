
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import StripePaymentForm from '@/components/payment/StripePaymentForm';
import CryptoPayment from '@/components/payment/CryptoPayment';
import PaymentEscrow from '@/components/payment/PaymentEscrow';
import WalletCard from '@/components/payment/WalletCard';

// Clé publique Stripe (clé publique, peut être exposée dans le frontend)
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const PaymentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("wallet");
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  
  // Données de démonstration
  const mockWalletBalance = 2450.75;
  const mockCryptoBalances = [
    { currency: 'BTC', amount: 0.02 },
    { currency: 'ETH', amount: 0.5 },
    { currency: 'USDT', amount: 100 }
  ];
  const mockEscrowPayments = [
    {
      id: 'pi_123456',
      projectId: 'P12345',
      freelancerName: 'Alexandre Dupont',
      clientName: 'Entreprise ABC',
      amount: 1250,
      currency: 'EUR',
      status: 'pending' as const
    },
    {
      id: 'pi_789012',
      projectId: 'P67890',
      freelancerName: 'Marie Lefebvre',
      clientName: 'Startup XYZ',
      amount: 850,
      currency: 'EUR',
      status: 'released' as const
    }
  ];

  // Rediriger si non authentifié
  useEffect(() => {
    if (!user) {
      toast({
        title: 'Authentification requise',
        description: 'Veuillez vous connecter pour accéder à la page de paiement.',
        variant: 'destructive',
      });
      navigate('/auth');
    }
  }, [user, navigate, toast]);

  const handlePaymentSuccess = (intentId: string) => {
    setPaymentIntentId(intentId);
    // Dans une application réelle, nous mettrions à jour la base de données ici
  };

  const handleCryptoSuccess = (txHash: string) => {
    // Dans une application réelle, nous mettrions à jour la base de données ici
    toast({
      title: 'Paiement crypto confirmé',
      description: `Transaction ${txHash.substring(0, 8)}...${txHash.substring(txHash.length - 8)} enregistrée.`,
    });
  };

  const handleReleaseEscrow = () => {
    // Dans une application réelle, nous mettrions à jour la base de données ici
    toast({
      title: 'Fonds libérés',
      description: 'Le paiement a été transféré au freelance.',
    });
  };

  const handleDepositFunds = () => {
    setActiveTab("pay");
    toast({
      title: 'Dépôt de fonds',
      description: 'Sélectionnez une méthode de paiement pour déposer des fonds.',
    });
  };

  const handleWithdrawFunds = () => {
    toast({
      title: 'Retrait de fonds',
      description: 'La fonctionnalité de retrait est en cours de développement.',
    });
  };

  const handleTransactionHistory = () => {
    toast({
      title: 'Historique des transactions',
      description: 'La fonctionnalité d\'historique est en cours de développement.',
    });
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Paiements</h1>
      <p className="text-muted-foreground mb-6">
        Gérez vos paiements, votre portefeuille numérique et vos transactions sécurisées.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="wallet">Portefeuille</TabsTrigger>
          <TabsTrigger value="pay">Payer</TabsTrigger>
          <TabsTrigger value="escrow">Séquestre</TabsTrigger>
        </TabsList>

        <TabsContent value="wallet" className="space-y-6">
          <WalletCard 
            balance={mockWalletBalance}
            currency="EUR"
            cryptoBalances={mockCryptoBalances}
            onDeposit={handleDepositFunds}
            onWithdraw={handleWithdrawFunds}
            onTransactionHistory={handleTransactionHistory}
          />
          
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Vos projets en cours</h3>
            {mockEscrowPayments.length > 0 ? (
              <div className="space-y-4">
                {mockEscrowPayments.map((escrow) => (
                  <PaymentEscrow
                    key={escrow.id}
                    paymentIntentId={escrow.id}
                    projectId={escrow.projectId}
                    freelancerName={escrow.freelancerName}
                    clientName={escrow.clientName}
                    amount={escrow.amount}
                    currency={escrow.currency}
                    status={escrow.status}
                    onRelease={handleReleaseEscrow}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aucun projet en cours avec paiement sous séquestre.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pay">
          <Card>
            <CardHeader>
              <CardTitle>Effectuer un paiement</CardTitle>
              <CardDescription>
                Choisissez votre méthode de paiement préférée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="card" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="card">Carte bancaire</TabsTrigger>
                  <TabsTrigger value="crypto">Crypto-monnaie</TabsTrigger>
                </TabsList>
                
                <TabsContent value="card">
                  <Elements stripe={stripePromise}>
                    <StripePaymentForm 
                      amount={100}
                      currency="eur"
                      projectId="demo-project"
                      isEscrow={true}
                      onSuccess={handlePaymentSuccess}
                    />
                  </Elements>
                </TabsContent>
                
                <TabsContent value="crypto">
                  <CryptoPayment 
                    amount={0.05}
                    projectId="demo-project"
                    onSuccess={handleCryptoSuccess}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escrow">
          <Card>
            <CardHeader>
              <CardTitle>Système de Séquestre</CardTitle>
              <CardDescription>
                Notre système de séquestre sécurise les paiements jusqu'à la validation du projet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md bg-muted/40">
                <h3 className="text-md font-semibold mb-2">Comment fonctionne le système de séquestre?</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Le client effectue un paiement qui est placé en séquestre</li>
                  <li>Le freelance travaille sur le projet en sachant que le paiement est sécurisé</li>
                  <li>Une fois le projet terminé et approuvé, les fonds sont libérés au freelance</li>
                  <li>En cas de litige, notre équipe peut intervenir pour arbitrer</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-md font-semibold">Créer un nouveau paiement sous séquestre</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Pour utiliser le système de séquestre, sélectionnez l'option lors de votre paiement.
                </p>
                <Button onClick={() => setActiveTab("pay")}>
                  Effectuer un paiement sécurisé
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {mockEscrowPayments.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Vos paiements en séquestre</h3>
              <div className="space-y-4">
                {mockEscrowPayments.map((escrow) => (
                  <PaymentEscrow
                    key={escrow.id}
                    paymentIntentId={escrow.id}
                    projectId={escrow.projectId}
                    freelancerName={escrow.freelancerName}
                    clientName={escrow.clientName}
                    amount={escrow.amount}
                    currency={escrow.currency}
                    status={escrow.status}
                    onRelease={handleReleaseEscrow}
                  />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentPage;
