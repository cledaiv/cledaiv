
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PaymentEscrow from '@/components/payment/PaymentEscrow';

interface EscrowTabProps {
  escrowPayments: Array<{
    id: string;
    projectId: string;
    freelancerName: string;
    clientName: string;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'released';
  }>;
  onReleaseEscrow: () => void;
  onGoToPayment: () => void;
}

const EscrowTab = ({ escrowPayments, onReleaseEscrow, onGoToPayment }: EscrowTabProps) => {
  return (
    <>
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
            <Button onClick={onGoToPayment}>
              Effectuer un paiement sécurisé
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {escrowPayments.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Vos paiements en séquestre</h3>
          <div className="space-y-4">
            {escrowPayments.map((escrow) => (
              <PaymentEscrow
                key={escrow.id}
                paymentIntentId={escrow.id}
                projectId={escrow.projectId}
                freelancerName={escrow.freelancerName}
                clientName={escrow.clientName}
                amount={escrow.amount}
                currency={escrow.currency}
                status={escrow.status}
                onRelease={onReleaseEscrow}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EscrowTab;
