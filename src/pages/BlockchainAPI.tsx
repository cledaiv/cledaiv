
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const BlockchainAPI = () => {
  const { toast } = useToast();
  
  // État pour l'onglet de vérification du solde
  const [balanceAddress, setBalanceAddress] = useState('');
  const [network, setNetwork] = useState('mainnet');
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  
  // État pour l'onglet de génération de contrat intelligent
  const [contractType, setContractType] = useState('token');
  const [contractCode, setContractCode] = useState<string | null>(null);
  const [contractInstructions, setContractInstructions] = useState<string | null>(null);
  const [isLoadingContract, setIsLoadingContract] = useState(false);
  
  const handleGetBalance = async () => {
    if (!balanceAddress) {
      toast({
        title: "Adresse manquante",
        description: "Veuillez entrer une adresse Ethereum valide.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoadingBalance(true);
    setBalance(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('blockchain-api', {
        body: { 
          action: 'getBalance',
          params: {
            address: balanceAddress,
            network,
          }
        },
      });
      
      if (error) throw error;
      
      setBalance(data.balance);
    } catch (error) {
      console.error('Erreur lors de la récupération du solde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer le solde. Vérifiez l'adresse et réessayez.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingBalance(false);
    }
  };
  
  const handleGenerateContract = async () => {
    setIsLoadingContract(true);
    setContractCode(null);
    setContractInstructions(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('blockchain-api', {
        body: { 
          action: 'generateSmartContract',
          params: {
            contractType,
          }
        },
      });
      
      if (error) throw error;
      
      setContractCode(data.contractCode);
      setContractInstructions(data.instructions);
    } catch (error) {
      console.error('Erreur lors de la génération du contrat:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le contrat intelligent. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingContract(false);
    }
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">API Blockchain pour Freelances</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vérification de Solde</CardTitle>
            <CardDescription>
              Vérifiez le solde d'une adresse Ethereum
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Adresse Ethereum</Label>
                <Input
                  id="address"
                  placeholder="0x..."
                  value={balanceAddress}
                  onChange={(e) => setBalanceAddress(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="network">Réseau</Label>
                <Select value={network} onValueChange={setNetwork}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un réseau" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mainnet">Ethereum Mainnet</SelectItem>
                    <SelectItem value="goerli">Goerli (Testnet)</SelectItem>
                    <SelectItem value="sepolia">Sepolia (Testnet)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={handleGetBalance}
                disabled={isLoadingBalance}
                className="w-full"
              >
                {isLoadingBalance ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Vérifier le solde
              </Button>
              
              {balance !== null && (
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <p className="font-medium">Solde:</p>
                  <p className="text-xl">{balance} ETH</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Générateur de Smart Contracts</CardTitle>
            <CardDescription>
              Générez facilement des contrats intelligents pour vos projets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contractType">Type de contrat</Label>
                <Select value={contractType} onValueChange={setContractType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type de contrat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="token">Token ERC-20</SelectItem>
                    <SelectItem value="nft">Collection NFT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={handleGenerateContract}
                disabled={isLoadingContract}
                className="w-full"
              >
                {isLoadingContract ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Générer le contrat
              </Button>
              
              {contractCode && (
                <div className="mt-4">
                  <p className="font-medium mb-2">Code du contrat:</p>
                  <div className="p-4 bg-muted rounded-md overflow-x-auto">
                    <pre className="text-xs">
                      <code>{contractCode}</code>
                    </pre>
                  </div>
                  
                  {contractInstructions && (
                    <div className="mt-4 p-4 bg-primary/10 rounded-md">
                      <p className="font-medium">Instructions:</p>
                      <p className="text-sm">{contractInstructions}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlockchainAPI;
