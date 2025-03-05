
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const BlockchainAPI = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      toast({
        title: 'Authentification requise',
        description: 'Veuillez vous connecter pour accéder aux API blockchain.',
        variant: 'destructive',
      });
      navigate('/auth');
    }
  }, [user, navigate, toast]);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">API Blockchain</h1>
      <p className="text-muted-foreground mb-6">
        Utilisez nos API prêtes à l'emploi pour intégrer des fonctionnalités blockchain dans vos projets.
      </p>

      <Tabs defaultValue="balance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="balance">Vérifier un solde</TabsTrigger>
          <TabsTrigger value="contract">Générer un contrat intelligent</TabsTrigger>
        </TabsList>

        <TabsContent value="balance">
          <BalanceChecker />
        </TabsContent>

        <TabsContent value="contract">
          <ContractGenerator />
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-sm text-muted-foreground">
        <h3 className="font-medium text-base mb-2">Remarques importantes :</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Ces API sont fournies à titre d'exemple et d'apprentissage.</li>
          <li>Pour les applications en production, nous recommandons d'utiliser des services dédiés et sécurisés.</li>
          <li>Ces démos utilisent le réseau de test Ethereum (sepolia). Aucuns frais réels ne sont engagés.</li>
          <li>Consultez notre documentation complète pour plus d'informations sur l'intégration.</li>
        </ul>
      </div>
    </div>
  );
};

const BalanceChecker = () => {
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState('sepolia');
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const checkBalance = async () => {
    if (!address) {
      setError('Veuillez entrer une adresse Ethereum');
      return;
    }

    setLoading(true);
    setError(null);
    setBalance(null);

    try {
      const { data, error } = await supabase.functions.invoke('blockchain-api', {
        body: { 
          action: 'getBalance',
          params: {
            address,
            network
          }
        },
      });

      if (error) throw error;
      
      setBalance(data.balance);
      toast({
        title: 'Succès',
        description: `Le solde a été récupéré avec succès.`,
      });
    } catch (err: any) {
      console.error('Error checking balance:', err);
      setError(err.message || 'Une erreur est survenue lors de la vérification du solde');
      toast({
        title: 'Erreur',
        description: 'Impossible de récupérer le solde. Veuillez vérifier l\'adresse et réessayer.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vérifier un solde Ethereum</CardTitle>
        <CardDescription>
          Consultez le solde d'une adresse Ethereum sur différents réseaux.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="eth-address">Adresse Ethereum</Label>
          <Input 
            id="eth-address"
            placeholder="0x..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Exemple: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="network">Réseau</Label>
          <Select value={network} onValueChange={setNetwork}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un réseau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mainnet">Ethereum Mainnet</SelectItem>
              <SelectItem value="sepolia">Sepolia (testnet)</SelectItem>
              <SelectItem value="goerli">Goerli (testnet)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {balance !== null && (
          <div className="p-4 bg-muted/50 rounded-md">
            <h4 className="font-medium mb-1">Résultat:</h4>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-semibold">{balance}</span>
                <span className="ml-1 text-muted-foreground">ETH</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(balance);
                  toast({
                    title: "Copié!",
                    description: "Le solde a été copié dans le presse-papiers.",
                  });
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={checkBalance} 
          disabled={loading || !address}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Vérification en cours...
            </>
          ) : (
            'Vérifier le solde'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

const ContractGenerator = () => {
  const [contractType, setContractType] = useState<'token' | 'nft'>('token');
  const [contractCode, setContractCode] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateContract = async () => {
    setLoading(true);
    setError(null);
    setContractCode(null);
    setInstructions(null);
    setCopied(false);

    try {
      const { data, error } = await supabase.functions.invoke('blockchain-api', {
        body: { 
          action: 'generateSmartContract',
          params: {
            contractType
          }
        },
      });

      if (error) throw error;
      
      setContractCode(data.contractCode);
      setInstructions(data.instructions);
      toast({
        title: 'Succès',
        description: `Le contrat intelligent a été généré avec succès.`,
      });
    } catch (err: any) {
      console.error('Error generating contract:', err);
      setError(err.message || 'Une erreur est survenue lors de la génération du contrat');
      toast({
        title: 'Erreur',
        description: 'Impossible de générer le contrat. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (contractCode) {
      navigator.clipboard.writeText(contractCode);
      setCopied(true);
      toast({
        title: "Copié!",
        description: "Le code du contrat a été copié dans le presse-papiers.",
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Générateur de contrats intelligents</CardTitle>
        <CardDescription>
          Générez rapidement des modèles de contrats intelligents pour vos projets blockchain.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contract-type">Type de contrat</Label>
          <Select 
            value={contractType} 
            onValueChange={(value) => setContractType(value as 'token' | 'nft')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un type de contrat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="token">Token ERC-20</SelectItem>
              <SelectItem value="nft">NFT (ERC-721)</SelectItem>
            </SelectContent>
          </Select>
          
          <p className="text-xs text-muted-foreground">
            {contractType === 'token' 
              ? 'Un token ERC-20 standard pour créer votre propre cryptomonnaie.' 
              : 'Un contrat NFT standard pour créer des actifs numériques uniques.'}
          </p>
        </div>
        
        {contractCode && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="contract-code">Code du contrat</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-8 text-xs"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Copié
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copier
                  </>
                )}
              </Button>
            </div>
            
            <Textarea
              id="contract-code"
              value={contractCode}
              readOnly
              className="font-mono text-xs h-[300px]"
            />
            
            {instructions && (
              <div className="p-3 text-xs border rounded-md bg-muted/30">
                <p className="font-medium mb-1">Instructions de déploiement:</p>
                <p>{instructions}</p>
              </div>
            )}
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={generateContract} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Génération en cours...
            </>
          ) : (
            'Générer le contrat'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlockchainAPI;
