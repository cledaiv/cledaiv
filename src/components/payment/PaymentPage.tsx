
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import WalletTab from '@/components/payment/WalletTab';
import PaymentTab from '@/components/payment/PaymentTab';
import EscrowTab from '@/components/payment/EscrowTab';

const PaymentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("wallet");
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  
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

        <TabsContent value="wallet">
          <WalletTab 
            balance={mockWalletBalance}
            currency="EUR"
            cryptoBalances={mockCryptoBalances}
            escrowPayments={mockEscrowPayments}
            onDepositFunds={handleDepositFunds}
            onWithdrawFunds={handleWithdrawFunds}
            onTransactionHistory={handleTransactionHistory}
            onReleaseEscrow={handleReleaseEscrow}
          />
        </TabsContent>

        <TabsContent value="pay">
          <PaymentTab 
            onPaymentSuccess={handlePaymentSuccess}
            onCryptoSuccess={handleCryptoSuccess}
          />
        </TabsContent>

        <TabsContent value="escrow">
          <EscrowTab 
            escrowPayments={mockEscrowPayments}
            onReleaseEscrow={handleReleaseEscrow}
            onGoToPayment={() => setActiveTab("pay")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentPage;
