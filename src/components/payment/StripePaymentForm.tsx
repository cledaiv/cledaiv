
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface PaymentFormProps {
  amount: number;
  currency: string;
  projectId: string;
  isEscrow?: boolean;
  freelancerId?: string;
  clientId?: string;
  onSuccess?: (paymentIntentId: string) => void;
}

const StripePaymentForm = ({ 
  amount, 
  currency, 
  projectId, 
  isEscrow = false,
  freelancerId,
  clientId,
  onSuccess 
}: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);
    setError(null);

    try {
      // Appeler notre fonction Edge pour créer un PaymentIntent
      const { data, error: functionError } = await supabase.functions.invoke('payment', {
        body: { 
          action: 'createPaymentIntent', 
          params: { 
            amount: amount * 100, // Stripe utilise les centimes
            currency, 
            projectId,
            isEscrow,
            freelancerId,
            clientId
          } 
        },
      });

      if (functionError) throw new Error(functionError.message);
      
      // Confirmer le paiement avec Stripe
      const { error: stripeError } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      toast({
        title: "Paiement réussi",
        description: isEscrow 
          ? "Votre paiement a été placé en séquestre et sera libéré à la fin du projet."
          : "Votre paiement a été traité avec succès.",
      });

      if (onSuccess) {
        onSuccess(data.paymentIntentId);
      }
    } catch (err: any) {
      console.error('Erreur de paiement:', err);
      setError(err.message);
      
      toast({
        title: "Erreur de paiement",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="card-element" className="block text-sm font-medium">
          Détails de la carte
        </label>
        <div className="p-3 border rounded-md">
          <CardElement id="card-element" options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }} />
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      <Button 
        type="submit" 
        disabled={!stripe || loading}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Traitement en cours...
          </>
        ) : (
          `Payer ${(amount).toFixed(2)} ${currency.toUpperCase()}`
        )}
      </Button>
      
      {isEscrow && (
        <p className="text-xs text-muted-foreground">
          Ce paiement sera sécurisé en séquestre jusqu'à la validation du projet.
        </p>
      )}
    </form>
  );
};

export default StripePaymentForm;
