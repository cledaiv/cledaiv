
import React from 'react';
import WalletCard from '@/components/payment/WalletCard';
import PaymentEscrow from '@/components/payment/PaymentEscrow';

interface WalletTabProps {
  balance: number;
  currency: string;
  cryptoBalances: Array<{
    currency: string;
    amount: number;
  }>;
  escrowPayments: Array<{
    id: string;
    projectId: string;
    freelancerName: string;
    clientName: string;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'released';
  }>;
  onDepositFunds: () => void;
  onWithdrawFunds: () => void;
  onTransactionHistory: () => void;
  onReleaseEscrow: () => void;
}

const WalletTab = ({
  balance,
  currency,
  cryptoBalances,
  escrowPayments,
  onDepositFunds,
  onWithdrawFunds,
  onTransactionHistory,
  onReleaseEscrow
}: WalletTabProps) => {
  return (
    <div className="space-y-6">
      <WalletCard 
        balance={balance}
        currency={currency}
        cryptoBalances={cryptoBalances}
        onDeposit={onDepositFunds}
        onWithdraw={onWithdrawFunds}
        onTransactionHistory={onTransactionHistory}
      />
      
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Vos projets en cours</h3>
        {escrowPayments.length > 0 ? (
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
        ) : (
          <p className="text-muted-foreground">Aucun projet en cours avec paiement sous séquestre.</p>
        )}
      </div>
    </div>
  );
};

export default WalletTab;
