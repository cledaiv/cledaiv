
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StripePaymentForm from '@/components/payment/StripePaymentForm';
import CryptoPayment from '@/components/payment/CryptoPayment';

// Stripe public key (public key, can be exposed in the frontend)
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface PaymentTabProps {
  onPaymentSuccess: (intentId: string) => void;
  onCryptoSuccess: (txHash: string) => void;
  amount?: number;
  planType?: string | null;
}

const PaymentTab = ({ 
  onPaymentSuccess, 
  onCryptoSuccess, 
  amount = 100, 
  planType = null 
}: PaymentTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Effectuer un paiement</CardTitle>
        <CardDescription>
          {planType 
            ? `Paiement pour l'abonnement ${planType}` 
            : 'Choisissez votre méthode de paiement préférée'}
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
                amount={amount}
                currency="eur"
                projectId={planType ? `subscription-${planType}` : "demo-project"}
                isEscrow={false}
                onSuccess={onPaymentSuccess}
              />
            </Elements>
          </TabsContent>
          
          <TabsContent value="crypto">
            <CryptoPayment 
              amount={amount * 0.0005} // Rough conversion to crypto equivalent
              projectId={planType ? `subscription-${planType}` : "demo-project"}
              onSuccess={onCryptoSuccess}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentTab;
