
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '@/components/projects/ProjectForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Project } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { Freelancer } from '@/types';
import { Helmet } from 'react-helmet-async';

const NewProject = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  // Fetch freelancers
  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('account_type', 'freelancer');
          
        if (error) throw error;
        setFreelancers(data as Freelancer[] || []);
      } catch (error: any) {
        console.error('Error fetching freelancers:', error);
      }
    };
    
    if (user) {
      fetchFreelancers();
    }
  }, [user]);

  // Redirect to login page if user is not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Handle project submission
  const handleSubmit = async (projectData: Project) => {
    try {
      // Convert Date objects to ISO strings for Supabase
      const newProject = {
        ...projectData,
        client_id: user?.id,
        status: 'open',
        created_at: new Date().toISOString(),
        start_date: projectData.start_date ? projectData.start_date.toISOString() : undefined,
        deadline: projectData.deadline ? projectData.deadline.toISOString() : undefined
      };
      
      const { data, error } = await supabase
        .from('projects')
        .insert(newProject)
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: 'Projet créé avec succès',
        description: 'Votre projet a été publié et est maintenant visible par les freelances.',
      });
      
      navigate(`/projects/${data.id}`);
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue lors de la création du projet.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }
  
  return (
    <div className="container mx-auto py-6">
      <Helmet>
        <title>Créer un nouveau projet | CLEDAIV</title>
        <meta name="description" content="Publiez votre projet et trouvez les meilleurs experts en IA et blockchain pour le réaliser." />
        <meta name="keywords" content="nouveau projet, publier, IA, blockchain, freelancers, experts" />
        <link rel="canonical" href="https://cledaiv.com/projects/new" />
      </Helmet>
      
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate('/projects')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux projets
      </Button>
      
      <h1 className="text-2xl font-bold mb-6">Créer un nouveau projet</h1>
      
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <ProjectForm onSubmit={handleSubmit} freelancers={freelancers} user={user} />
      </div>
    </div>
  );
};

export default NewProject;
