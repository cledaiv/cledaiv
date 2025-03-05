
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProjectList } from '@/components/projects/ProjectList';
import { useAuth } from '@/context/AuthContext';

const Projects = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!loading && !user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vos projets</h1>
        <Button onClick={() => navigate('/projects/new')}>
          <PlusCircle className="h-4 w-4 mr-2" /> Nouveau projet
        </Button>
      </div>
      <ProjectList />
    </div>
  );
};

export default Projects;
