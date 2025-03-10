
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, ArrowDownUp, History, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WalletCardProps {
  balance: number;
  currency: string;
  cryptoBalances?: Array<{
    currency: string;
    amount: number;
  }>;
  onDeposit?: () => void;
  onWithdraw?: () => void;
  onTransactionHistory?: () => void;
}

const WalletCard = ({ 
  balance, 
  currency, 
  cryptoBalances = [], 
  onDeposit, 
  onWithdraw, 
  onTransactionHistory 
}: WalletCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Portefeuille Numérique</CardTitle>
            <CardDescription>Gérez vos fonds en toute sécurité</CardDescription>
          </div>
          <Wallet className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md bg-muted p-4">
            <div className="text-sm text-muted-foreground">Solde disponible</div>
            <div className="text-3xl font-bold mt-1">{balance.toFixed(2)} {currency}</div>
          </div>
          
          {cryptoBalances.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Crypto-monnaies</h4>
              <div className="space-y-2">
                {cryptoBalances.map((crypto, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{crypto.currency}</span>
                    <span className="font-medium">{crypto.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-col space-y-2">
            <Button onClick={onDeposit}>
              <Plus className="mr-2 h-4 w-4" />
              Déposer des fonds
            </Button>
            <Button variant="outline" onClick={onWithdraw}>
              <ArrowDownUp className="mr-2 h-4 w-4" />
              Retirer des fonds
            </Button>
            <Button variant="ghost" onClick={onTransactionHistory}>
              <History className="mr-2 h-4 w-4" />
              Historique des transactions
            </Button>
          </div>

          <div className="border-t pt-3 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 mr-1 inline-block cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Conformément à la réglementation MiCA (Markets in Crypto-Assets) et aux directives anti-blanchiment (AML), nous pouvons demander une vérification supplémentaire pour certaines transactions.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span>Conformité réglementaire : transactions surveillées selon les normes AML et MiCA.</span>
            </div>
            <div className="mt-1">
              <span>Vos données sont protégées selon le RGPD. </span>
              <a href="/privacy-policy" className="text-primary hover:underline">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletCard;
