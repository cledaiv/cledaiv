
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ProjectDetail } from '@/components/projects/ProjectDetail';
import { useAuth } from '@/context/AuthContext';

const ProjectView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!loading && !user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/projects')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Retour aux projets
        </Button>
        
        <ProjectDetail />
      </div>
    </div>
  );
};

export default ProjectView;
