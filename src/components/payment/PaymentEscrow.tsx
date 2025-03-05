
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, CheckCircle2 } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface EscrowProps {
  paymentIntentId: string;
  projectId: string;
  freelancerName: string;
  clientName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'released';
  onRelease?: () => void;
}

const PaymentEscrow = ({ 
  paymentIntentId,
  projectId,
  freelancerName,
  clientName,
  amount,
  currency,
  status,
  onRelease
}: EscrowProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleReleaseEscrow = async () => {
    setLoading(true);

    try {
      // Appeler notre fonction Edge pour libérer l'entiercement
      const { data, error } = await supabase.functions.invoke('payment', {
        body: { 
          action: 'releaseEscrow', 
          params: { paymentIntentId } 
        },
      });

      if (error) throw error;

      toast({
        title: "Fonds libérés",
        description: "Les fonds ont été libérés avec succès au freelance.",
      });

      if (onRelease) {
        onRelease();
      }
      setDialogOpen(false);
    } catch (err: any) {
      console.error('Erreur de libération des fonds:', err);
      toast({
        title: "Erreur",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Paiement sous Séquestre</CardTitle>
            <CardDescription>Projet #{projectId}</CardDescription>
          </div>
          {status === 'pending' ? (
            <Shield className="h-6 w-6 text-primary" />
          ) : (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Client</p>
              <p>{clientName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Freelance</p>
              <p>{freelancerName}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Montant</p>
              <p className="font-semibold">{amount} {currency}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Statut</p>
              <p>
                {status === 'pending' && "En séquestre"}
                {status === 'completed' && "Projet terminé"}
                {status === 'released' && "Fonds libérés"}
              </p>
            </div>
          </div>
          
          {status === 'pending' && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" variant="default">
                  Libérer les fonds
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmer la libération des fonds</DialogTitle>
                  <DialogDescription>
                    Vous êtes sur le point de libérer {amount} {currency} à {freelancerName}. 
                    Cette action est irréversible.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm">
                    En confirmant, vous attestez que le projet a été complété de manière satisfaisante
                    et que toutes les conditions ont été remplies.
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleReleaseEscrow}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Traitement...
                      </>
                    ) : (
                      'Confirmer'
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          
          {status === 'completed' && (
            <Button className="w-full" variant="outline" disabled>
              En attente de libération
            </Button>
          )}
          
          {status === 'released' && (
            <Button className="w-full" variant="outline" disabled>
              Paiement finalisé
            </Button>
          )}
          
          <p className="text-xs text-muted-foreground">
            Les fonds sont sécurisés par notre système d'entiercement jusqu'à la validation du projet.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentEscrow;
