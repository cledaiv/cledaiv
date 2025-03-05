
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CustomQuote = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.user_metadata?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [projectDetails, setProjectDetails] = useState('');
  const [budget, setBudget] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/auth?redirect=subscription');
      return;
    }
    
    if (!name || !email || !projectDetails) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simuler l'envoi de la demande - dans une application réelle, nous appellerions un endpoint API
    setTimeout(() => {
      toast({
        title: "Demande envoyée",
        description: "Nous avons bien reçu votre demande de devis. Notre équipe vous contactera sous 24h.",
      });
      setIsSubmitting(false);
      setOpen(false);
      setProjectDetails('');
      setBudget('');
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">Demander un devis</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Demande de devis personnalisé</DialogTitle>
          <DialogDescription>
            Décrivez votre projet et nous vous contacterons sous 24h avec une proposition sur mesure.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nom complet</label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Votre nom" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="votre@email.com" 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="budget" className="text-sm font-medium">Budget estimé (optionnel)</label>
            <Input 
              id="budget" 
              value={budget} 
              onChange={(e) => setBudget(e.target.value)} 
              placeholder="Ex: 5000€" 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="project" className="text-sm font-medium">Description du projet</label>
            <Textarea 
              id="project" 
              value={projectDetails} 
              onChange={(e) => setProjectDetails(e.target.value)} 
              placeholder="Décrivez votre projet en détail..." 
              rows={4} 
              required 
            />
          </div>
          
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CustomQuote;
