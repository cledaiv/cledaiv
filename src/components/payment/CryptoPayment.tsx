
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Copy } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface CryptoPaymentProps {
  amount: number;
  projectId: string;
  onSuccess?: (txHash: string) => void;
}

const CryptoPayment = ({ amount, projectId, onSuccess }: CryptoPaymentProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [currency, setCurrency] = useState('ETH');
  const [txHash, setTxHash] = useState('');
  
  // Adresses de wallet pour recevoir les paiements (à des fins de démonstration)
  const walletAddresses = {
    ETH: '0x1234...5678',
    BTC: '1A2B3C...4D5E6F',
    USDT: '0xABCD...EF01'
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddresses[currency as keyof typeof walletAddresses]);
    toast({
      title: "Adresse copiée",
      description: "L'adresse du wallet a été copiée dans votre presse-papier.",
    });
  };

  const handleVerifyTransaction = async () => {
    if (!txHash.trim()) {
      toast({
        title: "Erreur de vérification",
        description: "Veuillez entrer un hash de transaction valide.",
        variant: "destructive",
      });
      return;
    }

    setVerifying(true);

    try {
      // Vérifier la transaction via notre fonction Edge
      const { data, error } = await supabase.functions.invoke('payment', {
        body: { 
          action: 'checkCryptoPayment', 
          params: { 
            txHash,
            amount,
            currency,
            projectId
          } 
        },
      });

      if (error) throw error;

      if (data.confirmed) {
        toast({
          title: "Transaction vérifiée",
          description: `Paiement de ${amount} ${currency} confirmé avec ${data.confirmations} confirmations.`,
        });

        if (onSuccess) {
          onSuccess(txHash);
        }
      } else {
        toast({
          title: "Transaction en attente",
          description: "Votre transaction a été détectée mais n'a pas encore assez de confirmations.",
        });
      }
    } catch (err: any) {
      console.error('Erreur de vérification:', err);
      toast({
        title: "Erreur de vérification",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-md bg-muted/50">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Montant à payer:</span>
            <span className="font-semibold">{amount} {currency}</span>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Choisissez une cryptomonnaie</label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une cryptomonnaie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                <SelectItem value="USDT">Tether (USDT)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Adresse de paiement</label>
            <div className="flex">
              <Input 
                value={walletAddresses[currency as keyof typeof walletAddresses]} 
                readOnly 
                className="rounded-r-none"
              />
              <Button
                type="button"
                variant="outline"
                className="rounded-l-none"
                onClick={handleCopyAddress}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Envoyez exactement {amount} {currency} à cette adresse.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 border-t pt-4">
        <label className="text-sm font-medium">Hash de transaction</label>
        <div className="flex space-x-2">
          <Input 
            value={txHash} 
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="Entrez le hash de la transaction"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleVerifyTransaction}
            disabled={verifying || !txHash.trim()}
          >
            {verifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Vérification...
              </>
            ) : (
              'Vérifier'
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Après avoir effectué le paiement, entrez le hash de transaction pour vérifier.
        </p>
      </div>
    </div>
  );
};

export default CryptoPayment;
