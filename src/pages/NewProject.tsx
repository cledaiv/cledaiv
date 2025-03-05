
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '@/components/projects/ProjectForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const NewProject = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Chargement...</div>;
  }
  
  return (
    <div className="container mx-auto py-6">
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate('/projects')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux projets
      </Button>
      
      <h1 className="text-2xl font-bold mb-6">Créer un nouveau projet</h1>
      
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <ProjectForm />
      </div>
    </div>
  );
};

export default NewProject;
