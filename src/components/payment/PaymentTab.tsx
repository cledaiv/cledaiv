
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StripePaymentForm from '@/components/payment/StripePaymentForm';
import CryptoPayment from '@/components/payment/CryptoPayment';

// Clé publique Stripe (clé publique, peut être exposée dans le frontend)
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

interface PaymentTabProps {
  onPaymentSuccess: (intentId: string) => void;
  onCryptoSuccess: (txHash: string) => void;
}

const PaymentTab = ({ onPaymentSuccess, onCryptoSuccess }: PaymentTabProps) => {
  return (
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
                onSuccess={onPaymentSuccess}
              />
            </Elements>
          </TabsContent>
          
          <TabsContent value="crypto">
            <CryptoPayment 
              amount={0.05}
              projectId="demo-project"
              onSuccess={onCryptoSuccess}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentTab;
